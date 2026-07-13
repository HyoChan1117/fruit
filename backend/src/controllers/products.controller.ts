import { Request, Response } from "express";
import prisma from "../prismaClient";
import { buildImageUrl, deleteImageIfExists } from "../middleware/upload";

export async function listProducts(req: Request, res: Response) {
  const name = typeof req.query.name === "string" ? req.query.name : undefined;

  const products = await prisma.product.findMany({
    where: name ? { name } : undefined,
    orderBy: { createdAt: "desc" },
  });

  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const { name, variety, description } = req.body;
  const imageUrl = req.file ? buildImageUrl("products", req.file.filename) : null;

  const product = await prisma.product.create({
    data: { name, variety, description, imageUrl },
  });

  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, variety, description } = req.body;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "product not found" });
  }

  let imageUrl = existing.imageUrl;
  if (req.file) {
    deleteImageIfExists(existing.imageUrl);
    imageUrl = buildImageUrl("products", req.file.filename);
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { name, variety, description, imageUrl },
  });

  res.json(updated);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "product not found" });
  }

  await prisma.product.delete({ where: { id } });
  deleteImageIfExists(existing.imageUrl);

  res.status(204).send();
}
