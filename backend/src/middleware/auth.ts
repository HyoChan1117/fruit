import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  adminId: number;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.adminId = payload.adminId;
    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}
