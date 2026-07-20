-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "serviceCtaTitle" TEXT NOT NULL DEFAULT '구천청과가 궁금하다면',
ADD COLUMN     "serviceIntroTitle" TEXT NOT NULL DEFAULT '어떤 서비스를 제공할까?',
ADD COLUMN     "valueCard4Body" TEXT NOT NULL DEFAULT '주문 후 문의와 요청에 빠르게 응대하여 끝까지 책임지고 관리합니다.',
ADD COLUMN     "valueCard4Title" TEXT NOT NULL DEFAULT '신속한 사후 관리',
ALTER COLUMN "valueCard1Body" SET DEFAULT '전국 산지에서 엄선한 신선 청과를 매일 직송으로 받아 최상의 상태를 유지합니다.',
ALTER COLUMN "valueCard1Title" SET DEFAULT '산지 직송',
ALTER COLUMN "valueCard2Body" SET DEFAULT '신속하고 투명한 경매 진행으로 합리적인 가격을 보장합니다.',
ALTER COLUMN "valueCard2Title" SET DEFAULT '투명한 경매',
ALTER COLUMN "valueCard3Body" SET DEFAULT '입고 단계부터 꼼꼼하게 검수하여 믿을 수 있는 품질만 선별합니다.',
ALTER COLUMN "valueCard3Title" SET DEFAULT '철저한 품질 검수';
