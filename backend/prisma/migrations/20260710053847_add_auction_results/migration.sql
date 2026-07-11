-- CreateTable
CREATE TABLE "AuctionResult" (
    "id" SERIAL NOT NULL,
    "auctionDate" TIMESTAMP(3) NOT NULL,
    "productName" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionResult_pkey" PRIMARY KEY ("id")
);
