import { Router } from "express";
import { getCompanyInfo, updateCompanyInfo } from "../controllers/companyInfo.controller";
import { requireAdmin } from "../middleware/auth";

const publicRouter = Router();
publicRouter.get("/", getCompanyInfo);

const adminRouter = Router();
adminRouter.put("/", requireAdmin, updateCompanyInfo);

export { publicRouter as companyInfoPublicRouter, adminRouter as companyInfoAdminRouter };
