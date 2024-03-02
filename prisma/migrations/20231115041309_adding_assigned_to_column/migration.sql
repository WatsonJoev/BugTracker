/*
  Warnings:

  - You are about to drop the column `profileId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "issue" DROP CONSTRAINT "issue_profileId_fkey";

-- AlterTable
ALTER TABLE "issue" DROP COLUMN "profileId",
ADD COLUMN     "assignedTo" UUID,
ADD COLUMN     "createdBy" UUID;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
