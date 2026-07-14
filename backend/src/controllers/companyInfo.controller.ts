import { Request, Response } from "express";
import prisma from "../prismaClient";
import { buildImageUrl, deleteImageIfExists } from "../middleware/upload";

export async function getCompanyInfo(_req: Request, res: Response) {
  const companyInfo = await prisma.companyInfo.findUnique({ where: { id: 1 } });
  res.json(companyInfo);
}

export async function updateCompanyInfo(req: Request, res: Response) {
  const {
    introText,
    address,
    nearbyInfo,
    parkingInfo,
    latitude,
    longitude,
    heroHeadline,
    heroSubcopy,
    heroTypewriterText,
    businessHours,
    holidays,
    auctionTime,
    valueCard1Title,
    valueCard1Body,
    valueCard2Title,
    valueCard2Body,
    valueCard3Title,
    valueCard3Body,
    aboutText,
  } = req.body;

  const updated = await prisma.companyInfo.update({
    where: { id: 1 },
    data: {
      introText,
      address,
      nearbyInfo,
      parkingInfo,
      latitude,
      longitude,
      heroHeadline,
      heroSubcopy,
      heroTypewriterText,
      businessHours,
      holidays,
      auctionTime,
      valueCard1Title,
      valueCard1Body,
      valueCard2Title,
      valueCard2Body,
      valueCard3Title,
      valueCard3Body,
      aboutText,
    },
  });

  res.json(updated);
}

export async function updateAboutImage(req: Request, res: Response) {
  const existing = await prisma.companyInfo.findUnique({ where: { id: 1 } });

  let aboutImageUrl = existing?.aboutImageUrl ?? null;
  if (req.file) {
    deleteImageIfExists(existing?.aboutImageUrl);
    aboutImageUrl = buildImageUrl("company", req.file.filename);
  }

  const updated = await prisma.companyInfo.update({
    where: { id: 1 },
    data: { aboutImageUrl },
  });

  res.json(updated);
}
