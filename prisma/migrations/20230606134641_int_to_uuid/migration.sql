/*
  Warnings:

  - The primary key for the `results` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "results" DROP CONSTRAINT "results_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "results_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "results_id_seq";
