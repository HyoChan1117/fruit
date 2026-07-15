-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "popupBannerEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "popupBannerImageUrl" TEXT,
ADD COLUMN     "popupBannerLinkUrl" TEXT;
