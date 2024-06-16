-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "orgId" UUID;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "org"("id") ON DELETE SET NULL ON UPDATE CASCADE;
