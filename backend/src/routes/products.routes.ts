import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { requireAdmin } from "../middleware/auth";
import { createUploader } from "../middleware/upload";

const upload = createUploader("products");

const publicRouter = Router();
publicRouter.get("/", listProducts);
publicRouter.get("/:id", getProduct);

const adminRouter = Router();
adminRouter.post("/", requireAdmin, upload.single("image"), createProduct);
adminRouter.put("/:id", requireAdmin, upload.single("image"), updateProduct);
adminRouter.delete("/:id", requireAdmin, deleteProduct);

export { publicRouter as productsPublicRouter, adminRouter as productsAdminRouter };
