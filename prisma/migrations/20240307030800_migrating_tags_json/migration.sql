-- AlterTable
ALTER TABLE "issue" ADD COLUMN     "tags" JSONB[];

-- CreateTable
CREATE TABLE "issueTags" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "issueTags_pkey" PRIMARY KEY ("id")
);
