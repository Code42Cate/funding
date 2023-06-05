-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "funding_opportunities" (
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuer" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "target_group" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deadline_at" TIMESTAMP(3),
    "start_at" TIMESTAMP(3),
    "id" SERIAL NOT NULL,
    "description_summary" TEXT,

    CONSTRAINT "funding_opportunities_pkey" PRIMARY KEY ("id")
);
