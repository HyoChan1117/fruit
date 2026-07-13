import { Router } from "express";
import { getStaticMap } from "../controllers/map.controller";

const publicRouter = Router();
publicRouter.get("/static", getStaticMap);

export { publicRouter as mapPublicRouter };
