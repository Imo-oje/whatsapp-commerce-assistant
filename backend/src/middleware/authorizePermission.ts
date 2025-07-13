import { FORBIDDEN, UNAUTHORIZED } from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";

// TODO : WRITE TEST FOR THIS MIDDLEWARE
const authorizePermission = (...authorizedPermissions: string[]) => {
  return asyncHandler(async (req, _res, next) => {
    appAssert(req.userId, UNAUTHORIZED, "No user ID found");

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        role: {
          select: {
            permissions: {
              select: { name: true },
            },
          },
        },
      },
    });

    appAssert(user, UNAUTHORIZED, "User not found");

    const userPermissions = user.role.permissions.map((p) => p.name);

    const missingPermissions = authorizedPermissions.filter(
      (perm) => !userPermissions.includes(perm)
    );

    appAssert(
      missingPermissions.length === 0,
      FORBIDDEN,
      `Forbidden - missing permissions: ${missingPermissions.join(", ")}`
    );

    next();
  });
};

export default authorizePermission;
