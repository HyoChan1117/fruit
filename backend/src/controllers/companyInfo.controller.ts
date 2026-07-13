import { Request, Response } from "express";
import prisma from "../prismaClient";

export async function getCompanyInfo(_req: Request, res: Response) {
  const companyInfo = await prisma.companyInfo.findUnique({ where: { id: 1 } });
  res.json(companyInfo);
}

export async function updateCompanyInfo(req: Request, res: Response) {
  const {
    introText,
    history,
    address,
    latitude,
    longitude,
    phone,
    email,
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
  } = req.body;

  const updated = await prisma.companyInfo.update({
    where: { id: 1 },
    data: {
      introText,
      history,
      address,
      latitude,
      longitude,
      phone,
      email,
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
    },
  });

  res.json(updated);
}
