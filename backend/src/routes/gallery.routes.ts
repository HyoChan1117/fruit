import { Router } from "express";
import {
  listGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from "../controllers/gallery.controller";
import { requireAdmin } from "../middleware/auth";
import { createUploader } from "../middleware/upload";

const upload = createUploader("gallery");

const publicRouter = Router();
publicRouter.get("/", listGalleryImages);

const adminRouter = Router();
adminRouter.post("/", requireAdmin, upload.single("image"), createGalleryImage);
adminRouter.delete("/:id", requireAdmin, deleteGalleryImage);

export { publicRouter as galleryPublicRouter, adminRouter as galleryAdminRouter };
