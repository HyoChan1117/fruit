-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "valueCard1Body" TEXT NOT NULL DEFAULT '엄격한 기준으로 농산물을 선별하여 품질을 보장합니다.',
ADD COLUMN     "valueCard1Title" TEXT NOT NULL DEFAULT '정직한 선별',
ADD COLUMN     "valueCard2Body" TEXT NOT NULL DEFAULT '산지에서 소비자까지 신선함을 유지하며 빠르게 전달합니다.',
ADD COLUMN     "valueCard2Title" TEXT NOT NULL DEFAULT '신선한 유통',
ADD COLUMN     "valueCard3Body" TEXT NOT NULL DEFAULT '구천청과 소개 문구를 관리자 페이지에서 입력해주세요.',
ADD COLUMN     "valueCard3Title" TEXT NOT NULL DEFAULT '믿을 수 있는 파트너';
