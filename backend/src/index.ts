import "dotenv/config";
import express from "express";
import { APP_ORIGIN, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { authenticate } from "./middleware/authenticate";
import storeRouter from "./routes/store.route";
import productRouter from "./routes/product.route";
import morgan from "morgan";
import adminRouter from "./routes/admin.route";
import cors from "cors";
import authorizeRole from "./middleware/authrizeRole";

const app = express();

const corsOptions = {
  origin: APP_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("trust proxy", 1 /* number of proxies between user and server */);

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticate, userRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", authenticate, authorizeRole("ADMIN"), adminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER]: Running on port ${PORT}`);
});
