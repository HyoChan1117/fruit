import { Router } from "express";
import {
  createInquiry,
  listInquiries,
  markInquiryRead,
  deleteInquiry,
} from "../controllers/inquiries.controller";
import { requireAdmin } from "../middleware/auth";

const publicRouter = Router();
publicRouter.post("/", createInquiry);

const adminRouter = Router();
adminRouter.get("/", requireAdmin, listInquiries);
adminRouter.put("/:id/read", requireAdmin, markInquiryRead);
adminRouter.delete("/:id", requireAdmin, deleteInquiry);

export { publicRouter as inquiriesPublicRouter, adminRouter as inquiriesAdminRouter };
