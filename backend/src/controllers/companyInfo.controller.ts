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
    serviceIntroTitle,
    serviceIntroIcon,
    valueCard1Title,
    valueCard1Body,
    valueCard1Icon,
    valueCard2Title,
    valueCard2Body,
    valueCard2Icon,
    valueCard3Title,
    valueCard3Body,
    valueCard3Icon,
    valueCard4Title,
    valueCard4Body,
    valueCard4Icon,
    serviceCtaTitle,
    aboutText,
    popupBannerEnabled,
    popupBannerLinkUrl,
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
      serviceIntroTitle,
      serviceIntroIcon,
      valueCard1Title,
      valueCard1Body,
      valueCard1Icon,
      valueCard2Title,
      valueCard2Body,
      valueCard2Icon,
      valueCard3Title,
      valueCard3Body,
      valueCard3Icon,
      valueCard4Title,
      valueCard4Body,
      valueCard4Icon,
      serviceCtaTitle,
      aboutText,
      popupBannerEnabled,
      popupBannerLinkUrl,
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

export async function updatePageBannerImage(req: Request, res: Response) {
  const existing = await prisma.companyInfo.findUnique({ where: { id: 1 } });

  let pageBannerImageUrl = existing?.pageBannerImageUrl ?? null;
  if (req.file) {
    deleteImageIfExists(existing?.pageBannerImageUrl);
    pageBannerImageUrl = buildImageUrl("company", req.file.filename);
  }

  const updated = await prisma.companyInfo.update({
    where: { id: 1 },
    data: { pageBannerImageUrl },
  });

  res.json(updated);
}

export async function updatePopupBannerImage(req: Request, res: Response) {
  const existing = await prisma.companyInfo.findUnique({ where: { id: 1 } });

  let popupBannerImageUrl = existing?.popupBannerImageUrl ?? null;
  if (req.file) {
    deleteImageIfExists(existing?.popupBannerImageUrl);
    popupBannerImageUrl = buildImageUrl("company", req.file.filename);
  }

  const updated = await prisma.companyInfo.update({
    where: { id: 1 },
    data: { popupBannerImageUrl },
  });

  res.json(updated);
}
