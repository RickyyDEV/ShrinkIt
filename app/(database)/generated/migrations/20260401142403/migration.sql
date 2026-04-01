/*
  Warnings:

  - A unique constraint covering the columns `[createdAt,id]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "url_id_idx";

-- AlterTable
ALTER TABLE "url" ALTER COLUMN "code" SET DEFAULT substring(md5(random()::text), 1, 8);

-- CreateIndex
CREATE INDEX "url_userId_idx" ON "url"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "url_createdAt_id_key" ON "url"("createdAt", "id");
