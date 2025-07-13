import { FORBIDDEN, UNAUTHORIZED } from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";

const authorizeRole = (...authorizedRoles: string[]) => {
  return asyncHandler(async (req, _res, next) => {
    appAssert(req.userId, UNAUTHORIZED, "No user ID found");
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { role: true },
    });
    appAssert(
      user && authorizedRoles.includes(user.role.name),
      FORBIDDEN,
      "Forbidden"
    );
    next();
  });
};
export default authorizeRole;
