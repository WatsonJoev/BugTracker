/*
  Warnings:

  - Made the column `tags` on table `issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "issue" ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "tags" SET DATA TYPE TEXT;
