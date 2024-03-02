/*
  Warnings:

  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_userId_fkey";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "fullname" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "issueId" INTEGER;

-- DropTable
DROP TABLE "Issue";

-- DropTable
DROP TABLE "note";

-- CreateTable
CREATE TABLE "issue" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
