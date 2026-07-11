import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function createUploader(subfolder: "notices" | "products" | "gallery") {
  const destDir = path.join(UPLOAD_ROOT, subfolder);
  fs.mkdirSync(destDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, destDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${crypto.randomUUID()}${ext}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE_BYTES },
    fileFilter: (_req, file, cb) => {
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error("지원하지 않는 이미지 형식입니다."));
      }
      cb(null, true);
    },
  });
}

export function buildImageUrl(subfolder: "notices" | "products" | "gallery", filename: string) {
  return `/uploads/${subfolder}/${filename}`;
}

export function deleteImageIfExists(imageUrl: string | null | undefined) {
  if (!imageUrl) return;
  const relativePath = imageUrl.replace(/^\/uploads\//, "");
  const fullPath = path.join(UPLOAD_ROOT, relativePath);
  fs.unlink(fullPath, () => {
    /* best-effort cleanup, ignore errors (e.g. file already missing) */
  });
}

export { UPLOAD_ROOT };
