import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { createRoleSchema, stringSchema } from "../utils/vlidationSchema";

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await prisma.user.findUnique({
    where: { id: req.params.adminId },
  });
  appAssert(admin, INTERNAL_SERVER_ERROR, "Admin not found");
  res.status(OK).json(admin);
});

export const getAllAdmin = asyncHandler(async (req, res) => {
  const admins = await prisma.user.findMany({
    where: {
      role: { name: "ADMIN" },
    },
  });
  appAssert(
    admins.length >= 0,
    INTERNAL_SERVER_ERROR,
    "Could not fetch admins"
  );
  res.status(OK).json(admins);
});

export const createPermissions = asyncHandler(async (req, res) => {
  const name = stringSchema.parse(req.body.name);
  const permissions = await prisma.permission.create({
    data: {
      name,
    },
  });
  appAssert(permissions, INTERNAL_SERVER_ERROR, "can't create permission");
  res.status(CREATED).json({ success: true });
});

export const createRoles = asyncHandler(async (req, res) => {
  const { name, permissions: permissionIds } = createRoleSchema.parse(req.body);

  const roleExists = await prisma.role.findUnique({
    where: {
      name,
    },
  });
  appAssert(!roleExists, INTERNAL_SERVER_ERROR, "Role already exists");

  const permissions = await prisma.permission.findMany({
    where: {
      id: { in: permissionIds },
    },
  });
  appAssert(
    permissions.length > 0,
    INTERNAL_SERVER_ERROR,
    "can't create permission"
  );

  const role = await prisma.role.create({
    data: {
      name,
      permissions: {
        connect: permissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
    include: {
      permissions: true,
    },
  });
  appAssert(role, INTERNAL_SERVER_ERROR, "can't create role");
  res.status(CREATED).json({ success: true, data: role });
});
