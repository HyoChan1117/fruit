import { Request, Response } from "express";
import prisma from "../prismaClient";
import { buildImageUrl, deleteImageIfExists } from "../middleware/upload";

const PAGE_SIZE = 10;

export async function listNotices(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.notice.count(),
  ]);

  res.json({ notices, total, page, pageSize: PAGE_SIZE });
}

export async function getNotice(req: Request, res: Response) {
  const notice = await prisma.notice.findUnique({ where: { id: Number(req.params.id) } });
  if (!notice) {
    return res.status(404).json({ error: "notice not found" });
  }
  res.json(notice);
}

export async function createNotice(req: Request, res: Response) {
  const { title, body } = req.body;
  const imageUrl = req.file ? buildImageUrl("notices", req.file.filename) : null;

  const notice = await prisma.notice.create({
    data: { title, body, imageUrl },
  });

  res.status(201).json(notice);
}

export async function updateNotice(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, body } = req.body;

  const existing = await prisma.notice.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "notice not found" });
  }

  let imageUrl = existing.imageUrl;
  if (req.file) {
    deleteImageIfExists(existing.imageUrl);
    imageUrl = buildImageUrl("notices", req.file.filename);
  }

  const updated = await prisma.notice.update({
    where: { id },
    data: { title, body, imageUrl },
  });

  res.json(updated);
}

export async function deleteNotice(req: Request, res: Response) {
  const id = Number(req.params.id);

  const existing = await prisma.notice.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "notice not found" });
  }

  await prisma.notice.delete({ where: { id } });
  deleteImageIfExists(existing.imageUrl);

  res.status(204).send();
}
