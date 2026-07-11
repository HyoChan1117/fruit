import { Router } from "express";
import {
  listNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/notices.controller";
import { requireAdmin } from "../middleware/auth";
import { createUploader } from "../middleware/upload";

const upload = createUploader("notices");

const publicRouter = Router();
publicRouter.get("/", listNotices);
publicRouter.get("/:id", getNotice);

const adminRouter = Router();
adminRouter.post("/", requireAdmin, upload.single("image"), createNotice);
adminRouter.put("/:id", requireAdmin, upload.single("image"), updateNotice);
adminRouter.delete("/:id", requireAdmin, deleteNotice);

export { publicRouter as noticesPublicRouter, adminRouter as noticesAdminRouter };
