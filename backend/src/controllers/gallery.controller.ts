import { Request, Response } from "express";
import prisma from "../prismaClient";
import { buildImageUrl, deleteImageIfExists } from "../middleware/upload";

export async function listGalleryImages(_req: Request, res: Response) {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  res.json(images);
}

export async function createGalleryImage(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: "이미지 파일이 필요합니다." });
  }

  const { caption } = req.body;
  const imageUrl = buildImageUrl("gallery", req.file.filename);

  const image = await prisma.galleryImage.create({
    data: { imageUrl, caption },
  });

  res.status(201).json(image);
}

export async function deleteGalleryImage(req: Request, res: Response) {
  const id = Number(req.params.id);

  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "gallery image not found" });
  }

  await prisma.galleryImage.delete({ where: { id } });
  deleteImageIfExists(existing.imageUrl);

  res.status(204).send();
}
