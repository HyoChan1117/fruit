import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes";
import { companyInfoPublicRouter, companyInfoAdminRouter } from "./routes/companyInfo.routes";
import { noticesPublicRouter, noticesAdminRouter } from "./routes/notices.routes";
import { productsPublicRouter, productsAdminRouter } from "./routes/products.routes";
import { galleryPublicRouter, galleryAdminRouter } from "./routes/gallery.routes";
import { inquiriesPublicRouter, inquiriesAdminRouter } from "./routes/inquiries.routes";
import { auctionResultsPublicRouter, auctionResultsAdminRouter } from "./routes/auctionResults.routes";
import { mapPublicRouter } from "./routes/map.routes";
import { errorHandler } from "./middleware/errorHandler";
import { UPLOAD_ROOT } from "./middleware/upload";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(UPLOAD_ROOT));

app.use("/api/auth", authRoutes);
app.use("/api/company-info", companyInfoPublicRouter);
app.use("/api/notices", noticesPublicRouter);
app.use("/api/products", productsPublicRouter);
app.use("/api/gallery", galleryPublicRouter);
app.use("/api/inquiries", inquiriesPublicRouter);
app.use("/api/auction-results", auctionResultsPublicRouter);
app.use("/api/map", mapPublicRouter);

app.use("/api/admin/company-info", companyInfoAdminRouter);
app.use("/api/admin/notices", noticesAdminRouter);
app.use("/api/admin/products", productsAdminRouter);
app.use("/api/admin/gallery", galleryAdminRouter);
app.use("/api/admin/inquiries", inquiriesAdminRouter);
app.use("/api/admin/auction-results", auctionResultsAdminRouter);

app.use(errorHandler);

export default app;
