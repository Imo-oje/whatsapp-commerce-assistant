import { Router } from "express";
import {
  loginHandler,
  logOutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetEmailHandler,
  verifyEmailHandler,
} from "../controllers/authController";
import { rateLimit } from "express-rate-limit";

const authRouter = Router();

authRouter.post(
  "/register",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: "Too many registeration attempts, try again later",
  }),
  registerHandler
);
authRouter.post("/login", loginHandler);
authRouter.get("/logout", logOutHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/email/verify/:code", verifyEmailHandler);
authRouter.post("/password/forgot", sendPasswordResetEmailHandler);
authRouter.post("/password/reset", resetPasswordHandler);

export default authRouter;
