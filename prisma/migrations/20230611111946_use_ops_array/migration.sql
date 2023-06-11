/*
  Warnings:

  - You are about to drop the column `funding_opportunity_id` on the `results` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_funding_opportunity_id_fkey";

-- AlterTable
ALTER TABLE "funding_opportunities" ADD COLUMN     "resultId" TEXT;

-- AlterTable
ALTER TABLE "results" DROP COLUMN "funding_opportunity_id",
ADD COLUMN     "funding_opportunities" JSONB NOT NULL DEFAULT '[]';
