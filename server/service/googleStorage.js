import { Storage } from "@google-cloud/storage";
import multer from "multer";

export const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.FILE_NAME_KEY,
});

export const bucket = storage.bucket(process.env.BUCKET_ID);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
