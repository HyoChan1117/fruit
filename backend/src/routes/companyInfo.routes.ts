import { Router } from "express";
import { getCompanyInfo, updateCompanyInfo, updateAboutImage } from "../controllers/companyInfo.controller";
import { requireAdmin } from "../middleware/auth";
import { createUploader } from "../middleware/upload";

const upload = createUploader("company");

const publicRouter = Router();
publicRouter.get("/", getCompanyInfo);

const adminRouter = Router();
adminRouter.put("/", requireAdmin, updateCompanyInfo);
adminRouter.put("/about-image", requireAdmin, upload.single("aboutImage"), updateAboutImage);

export { publicRouter as companyInfoPublicRouter, adminRouter as companyInfoAdminRouter };
