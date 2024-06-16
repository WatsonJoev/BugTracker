/*
  Warnings:

  - The primary key for the `org` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "org" DROP CONSTRAINT "org_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "org_pkey" PRIMARY KEY ("id");
