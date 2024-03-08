/*
  Warnings:

  - The `tags` column on the `issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "issue" DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB[] DEFAULT ARRAY[]::JSONB[];
