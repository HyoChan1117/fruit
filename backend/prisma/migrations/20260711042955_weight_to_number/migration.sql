/*
  Warnings:

  - Changed the type of `weight` on the `AuctionResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AuctionResult"
  ALTER COLUMN "weight" TYPE DOUBLE PRECISION
  USING NULLIF(regexp_replace("weight", '[^0-9.]', '', 'g'), '')::DOUBLE PRECISION;
