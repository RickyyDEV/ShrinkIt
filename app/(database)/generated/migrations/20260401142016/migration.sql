/*
  Warnings:

  - The primary key for the `url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `url` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "url" DROP CONSTRAINT "url_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "code" SET DEFAULT substring(md5(random()::text), 1, 8),
ADD CONSTRAINT "url_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "url_code_key" ON "url"("code");

-- CreateIndex
CREATE INDEX "url_id_idx" ON "url"("id");
