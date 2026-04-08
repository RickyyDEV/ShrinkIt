-- DropIndex
DROP INDEX "url_userId_idx";

-- AlterTable
ALTER TABLE "url" ALTER COLUMN "code" SET DEFAULT substring(md5(random()::text), 1, 8);

-- CreateIndex
CREATE INDEX "url_userId_expireAt_idx" ON "url"("userId", "expireAt");
