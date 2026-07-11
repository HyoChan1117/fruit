import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prismaClient";

const PAGE_SIZE = 10;
const HOME_PREVIEW_COUNT = 5;
const HOME_PREVIEW_MAX = 50;

function buildDateWhere(dateParam: unknown): Prisma.AuctionResultWhereInput | undefined {
  if (typeof dateParam !== "string" || !dateParam) return undefined;

  const start = new Date(dateParam);
  if (Number.isNaN(start.getTime())) return undefined;

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { auctionDate: { gte: start, lt: end } };
}

export async function listAuctionResults(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const where = buildDateWhere(req.query.date);

  const [auctionResults, total] = await Promise.all([
    prisma.auctionResult.findMany({
      where,
      orderBy: { auctionDate: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.auctionResult.count({ where }),
  ]);

  res.json({ auctionResults, total, page, pageSize: PAGE_SIZE });
}

export async function listRecentAuctionResults(req: Request, res: Response) {
  const requestedLimit = Number(req.query.limit) || HOME_PREVIEW_COUNT;
  const limit = Math.min(HOME_PREVIEW_MAX, Math.max(1, requestedLimit));

  const auctionResults = await prisma.auctionResult.findMany({
    orderBy: { auctionDate: "desc" },
    take: limit,
  });

  res.json(auctionResults);
}

export async function createAuctionResult(req: Request, res: Response) {
  const { auctionDate, ownerName, productName, variety, grade, weight, quantity, unitPrice } = req.body;

  const auctionResult = await prisma.auctionResult.create({
    data: {
      auctionDate: new Date(auctionDate),
      ownerName,
      productName,
      variety,
      grade,
      weight: Number(weight),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
    },
  });

  res.status(201).json(auctionResult);
}

export async function updateAuctionResult(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { auctionDate, ownerName, productName, variety, grade, weight, quantity, unitPrice } = req.body;

  const existing = await prisma.auctionResult.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "auction result not found" });
  }

  const updated = await prisma.auctionResult.update({
    where: { id },
    data: {
      auctionDate: new Date(auctionDate),
      ownerName,
      productName,
      variety,
      grade,
      weight: Number(weight),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
    },
  });

  res.json(updated);
}

export async function deleteAuctionResult(req: Request, res: Response) {
  const id = Number(req.params.id);

  const existing = await prisma.auctionResult.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "auction result not found" });
  }

  await prisma.auctionResult.delete({ where: { id } });

  res.status(204).send();
}
