/*
  Warnings:

  - Added the required column `variety` to the `AuctionResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionResult" ADD COLUMN     "variety" TEXT NOT NULL DEFAULT '';
ALTER TABLE "AuctionResult" ALTER COLUMN "variety" DROP DEFAULT;
