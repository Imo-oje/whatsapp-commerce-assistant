import ErrorCode from "../constants/errorCode";
import { UNAUTHORIZED } from "../constants/HttpStatusCode";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { verifyToken } from "../utils/jwt";

export const authenticate = asyncHandler(async (req, _res, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Unauthorized",
    ErrorCode.InvalidAccessToken
  );
  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    ErrorCode.InvalidAccessToken
  );

  (req.userId = payload.userId), (req.sessionId = payload.sessionId);
  next();
});
