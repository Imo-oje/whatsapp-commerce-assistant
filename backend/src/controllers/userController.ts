import { APP_ORIGIN } from "../constants/env";
import {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  OK,
  TOO_MANY_REQUESTS,
} from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { fiveMinutesAgo, tenMinutesFromNow } from "../utils/date";
import { getPasswordResetTemplate } from "../utils/emailTemplate";
import { omitPassword } from "../utils/prisma";
import { sendMail } from "../utils/sendMail";

export const getUserProfile = asyncHandler(async (req, res) => {
  const userProfile = await prisma.user.findUnique({
    where: { id: req.userId },
    include: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });
  appAssert(userProfile, FORBIDDEN, "Invalid User");
  res.status(OK).json(omitPassword(userProfile));
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");
  appAssert(!user.isVerified, FORBIDDEN, "Verified user");
  // Delete existing verification emails
  await prisma.verificationCode.deleteMany({
    where: { userId: user.id },
  });

  const fiveMinAgo = fiveMinutesAgo();
  const count = await prisma.verificationCode.count({
    where: { createdAt: { gt: fiveMinAgo } },
  });
  appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests");

  const expiresAt = tenMinutesFromNow();
  const verificationCode = await prisma.verificationCode.create({
    data: {
      expiresAt,
      userId: user.id,
      type: "EMAIL_VERIFICATION",
    },
  });

  // Send verification email
  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode.id
  }&exp=${expiresAt.getTime()}`;

  const data = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });
  appAssert(data, INTERNAL_SERVER_ERROR, "Error sending verification code");
  res.status(OK).json({ message: "Verification email sent" });
});
