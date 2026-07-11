import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username과 password가 필요합니다." });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: COOKIE_MAX_AGE_MS,
  });

  res.json({ username: admin.username });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  res.status(204).send();
}

export async function me(req: Request, res: Response) {
  const admin = await prisma.admin.findUnique({ where: { id: req.adminId as number } });
  if (!admin) {
    return res.status(401).json({ error: "unauthorized" });
  }
  res.json({ username: admin.username });
}
