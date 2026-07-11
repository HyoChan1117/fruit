/*
  Warnings:

  - Added the required column `ownerName` to the `AuctionResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionResult" ADD COLUMN     "ownerName" TEXT NOT NULL;
