/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `spec` on the `Product` table. All the data in the column will be lost.
  - Added the required column `variety` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
DROP COLUMN "spec",
ADD COLUMN     "variety" TEXT NOT NULL;
