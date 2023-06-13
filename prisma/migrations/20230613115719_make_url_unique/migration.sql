/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `funding_opportunities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "funding_opportunities_url_key" ON "funding_opportunities"("url");
