import { Router } from "express";
import {
  createPermissions,
  createRoles,
  getAdminProfile,
  getAllAdmin,
} from "../controllers/adminController";
import authorizePermission from "../middleware/authorizePermission";

const adminRouter = Router();

adminRouter.get(
  "/profile/:adminId",
  authorizePermission("MANAGE_ADMINS"),
  getAdminProfile
);
adminRouter.get(
  "/profile/all",
  authorizePermission("MANAGE_ADMINS"),
  getAllAdmin
);
adminRouter.post(
  "/permission/create",
  authorizePermission("MANAGE_PERMISSIONS"),
  createPermissions
);
adminRouter.post(
  "/role/create",
  authorizePermission("MANAGE_ROLES"),
  createRoles
);

export default adminRouter;
