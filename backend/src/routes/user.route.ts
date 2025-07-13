import { Router } from "express";
import {
  getUserProfile,
  resendVerificationEmail,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/profile", getUserProfile);
userRouter.get("/email/verify/send", resendVerificationEmail);

export default userRouter;
