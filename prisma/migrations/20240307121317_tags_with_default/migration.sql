-- AlterTable
ALTER TABLE "issue" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::JSONB[];
