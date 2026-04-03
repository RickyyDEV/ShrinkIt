-- AlterTable
ALTER TABLE "url" ADD COLUMN     "expireAt" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ALTER COLUMN "code" SET DEFAULT substring(md5(random()::text), 1, 8);
