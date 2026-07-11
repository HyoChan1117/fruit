import { Router } from "express";
import {
  listAuctionResults,
  listRecentAuctionResults,
  createAuctionResult,
  updateAuctionResult,
  deleteAuctionResult,
} from "../controllers/auctionResults.controller";
import { requireAdmin } from "../middleware/auth";

const publicRouter = Router();
publicRouter.get("/", listAuctionResults);
publicRouter.get("/recent", listRecentAuctionResults);

const adminRouter = Router();
adminRouter.post("/", requireAdmin, createAuctionResult);
adminRouter.put("/:id", requireAdmin, updateAuctionResult);
adminRouter.delete("/:id", requireAdmin, deleteAuctionResult);

export { publicRouter as auctionResultsPublicRouter, adminRouter as auctionResultsAdminRouter };
