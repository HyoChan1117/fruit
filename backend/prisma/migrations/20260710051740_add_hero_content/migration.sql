-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "heroHeadline" TEXT NOT NULL DEFAULT '가장 신선한 순간을,
선별합니다.',
ADD COLUMN     "heroSubcopy" TEXT NOT NULL DEFAULT '구천청과는 엄격한 기준으로 선별한 농산물을 산지에서 식탁까지 정직하게 전달하는 선과장입니다.',
ADD COLUMN     "heroTypewriterText" TEXT NOT NULL DEFAULT 'FRESH · SELECTED · DELIVERED';
