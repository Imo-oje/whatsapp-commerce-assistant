import upload from "../config/multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import appAssert from "../utils/appAssert";
import { BAD_REQUEST } from "../constants/HttpStatusCode";
import AppError from "../utils/appError";

// will auto-read config details from   CLOUDINARY_URL
cloudinary.config();

const streamImages = (buffer: Buffer): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, (error, result) =>
        error ? reject(error) : resolve(result as UploadApiResponse)
      )
      .end(buffer)
  );

const uploadImages = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return next(new AppError(BAD_REQUEST, "No images provided"));
  }

  console.log(req.files);

  // appAssert(req.files?.length, BAD_REQUEST, "No images provided");

  const result = await Promise.all(
    (req.files as Express.Multer.File[]).map((file) =>
      streamImages(file.buffer)
    )
  );

  req.cloudinaryImages = result.map(({ secure_url, public_id }) => ({
    secure_url,
    public_id,
  }));

  return next();
});

export default uploadImages;
