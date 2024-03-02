/*
  Warnings:

  - You are about to drop the column `issueId` on the `profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_issueId_fkey";

-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "profileId" UUID;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "issueId";

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
