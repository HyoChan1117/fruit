import { Request, Response } from "express";
import prisma from "../prismaClient";
import { notifySlackInquiry } from "../utils/slack";

export async function createInquiry(req: Request, res: Response) {
  const { name, contact, message } = req.body;

  if (!name || !contact || !message) {
    return res.status(400).json({ error: "name, contact, message가 모두 필요합니다." });
  }

  const inquiry = await prisma.inquiry.create({ data: { name, contact, message } });
  res.status(201).json(inquiry);

  notifySlackInquiry(inquiry);
}

export async function listInquiries(_req: Request, res: Response) {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  res.json(inquiries);
}

export async function markInquiryRead(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await prisma.inquiry.update({ where: { id }, data: { isRead: true } });
  res.json(updated);
}

export async function deleteInquiry(req: Request, res: Response) {
  const id = Number(req.params.id);

  const existing = await prisma.inquiry.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "inquiry not found" });
  }

  await prisma.inquiry.delete({ where: { id } });
  res.status(204).send();
}
