import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1025 },
  fileFilter: (_, file: Express.Multer.File, cb: FileFilterCallback) =>
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only images are allowed")),
});

//upload.fields([{ name: "images", maxCount: 4 }]);

export default upload;
