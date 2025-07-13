import ErrorCode from "../constants/errorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";

class AppError extends Error {
  constructor(
    public statuscode: HttpStatusCode,
    public message: string,
    public errorCode?: ErrorCode
  ) {
    super(message);
  }
}

export default AppError;
