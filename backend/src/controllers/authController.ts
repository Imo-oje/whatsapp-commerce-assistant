import { asyncHandler } from "../utils/asyncFunctionHandler";
import {
  emailSchema,
  loginSchema,
  passwordResetSchema,
  registerSchema,
  verificatioCodeSchema,
} from "../utils/vlidationSchema";
import bcrypt from "bcrypt";
import prisma from "../db/client";
import { APP_ORIGIN } from "../constants/env";
import { sendMail } from "../utils/sendMail";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplate";
import appAssert from "../utils/appAssert";
import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/HttpStatusCode";
import {
  fiveMinutesAgo,
  ONE_DAY_MS,
  tenMinutesFromNow,
  thirtyDaysFromNow,
} from "../utils/date";
import { refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  clearAuthCookies,
  refreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookie";

export const registerHandler = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, userAgent, ipAddress } =
    registerSchema().parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    });

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  appAssert(!existingUser, CONFLICT, "User Already Exists");

  const defaultRole = await prisma.role.findUnique({
    where: { name: "USER" },
    select: { id: true },
  });
  appAssert(defaultRole, INTERNAL_SERVER_ERROR, "Could not determine role");

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwordHash: hashedPassword,
      roleId: defaultRole.id,
    },
  });

  // Create token and send verification email
  const verificationToken = await prisma.verificationCode.create({
    data: {
      userId: user.id,
      expiresAt: tenMinutesFromNow(),
    },
  });

  const url = `${APP_ORIGIN}/verify?token=${verificationToken.id}`;
  const sendEmail = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url, user.firstName as string),
  });
  appAssert(sendEmail, INTERNAL_SERVER_ERROR, "Error sending Email");

  // Create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
      ipAddress,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  // Sign tokens
  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );
  const accessToken = signToken({ userId: user.id, sessionId: session.id });

  // Set auth cookies
  return setAuthCookies(accessToken, refreshToken, res).status(CREATED).json({
    message: "Sign up successful",
  });
});

export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password, userAgent, ipAddress } = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  });

  // Validate password
  const user = await prisma.user.findFirst({
    where: { email },
    include: { role: true },
  });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  const isValid = await bcrypt.compare(password, user.passwordHash);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  // Create session
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent,
      ipAddress,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  // Sign tokens
  const refreshToken = signToken(
    { sessionId: session.id },
    refreshTokenSignOptions
  );
  const accessToken = signToken({ userId: user.id, sessionId: session.id });

  // Set auth cookies
  return setAuthCookies(accessToken, refreshToken, res).status(OK).json({
    message: "Login successful",
    role: user.role.name,
  });
});

export const logOutHandler = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await prisma.session.delete({ where: { id: payload.sessionId } });
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export const refreshHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Invalid refresh token");

  // Verify token
  const { payload } = verifyToken(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session expired"
  );

  // Extend session if it will expire within the next 24hrs
  const sessionWillSoonExpire =
    session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS; //will expire within the next 24hrs

  if (sessionWillSoonExpire) {
    await prisma.session.update({
      where: { id: session.id },
      data: {
        expiresAt: thirtyDaysFromNow(),
      },
    });
  }

  // Update refresh token span along with session span
  const newRefreshToken = sessionWillSoonExpire
    ? signToken({ sessionId: session.id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session.id,
  });

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, accessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});

export const verifyEmailHandler = asyncHandler(async (req, res) => {
  const code = verificatioCodeSchema.parse(req.params.code);
  const verificationCode = await prisma.verificationCode.findUnique({
    where: {
      id: code,
      type: "EMAIL_VERIFICATION",
      expiresAt: { gt: new Date() },
    },
  });
  appAssert(verificationCode, NOT_FOUND, "Invalid or expired code");

  const user = await prisma.user.update({
    where: { id: verificationCode.userId },
    data: { isVerified: true },
  });
  appAssert(user, INTERNAL_SERVER_ERROR, "User verification failed");

  await prisma.verificationCode.delete({ where: { id: verificationCode.id } });

  return res.status(OK).json({ message: "Email verified" });
});

export const sendPasswordResetEmailHandler = asyncHandler(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  const user = await prisma.user.findUnique({ where: { email } });
  appAssert(user, NOT_FOUND, "User not found");

  // Handle too many requests
  const fiveMinAgo = fiveMinutesAgo();
  const count = await prisma.verificationCode.count({
    where: { createdAt: { gt: fiveMinAgo } },
  });
  appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests");

  // Create verification code
  const expiresAt = tenMinutesFromNow();
  const verificationCode = await prisma.verificationCode.create({
    data: { expiresAt, type: "PASSWORD_RESET", userId: user.id },
  });

  // Send verification email
  const url = `${APP_ORIGIN}/auth/reset-password?code=${
    verificationCode.id
  }&exp=${expiresAt.getTime()}`;

  const data = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });
  appAssert(data, INTERNAL_SERVER_ERROR, "Error sending verification email");
  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = asyncHandler(async (req, res) => {
  const { password, verificationCode: code } = passwordResetSchema.parse({
    ...req.body,
  });

  // Verify code
  const verificationCode = await prisma.verificationCode.findUnique({
    where: { id: code, type: "PASSWORD_RESET", expiresAt: { gt: new Date() } },
  });
  appAssert(
    verificationCode,
    NOT_FOUND,
    "Invalid or Expired verification code"
  );

  // Update user password
  const user = await prisma.user.update({
    where: { id: verificationCode.userId },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
    },
  });
  appAssert(user, INTERNAL_SERVER_ERROR, "Failed to reset password");

  // Delete code and sessions
  await prisma.verificationCode.delete({ where: { id: verificationCode.id } });
  await prisma.session.deleteMany({ where: { userId: user.id } });

  return res.status(OK).json({ message: "Password reset successful" });
});
