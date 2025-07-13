import assert from "node:assert";
import AppError from "./appError";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import ErrorCode from "../constants/errorCode";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  errorCode?: ErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAssert;
