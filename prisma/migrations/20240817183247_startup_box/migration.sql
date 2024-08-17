-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "lastname" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "_org" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_org_AB_unique" ON "_org"("A", "B");

-- CreateIndex
CREATE INDEX "_org_B_index" ON "_org"("B");

-- AddForeignKey
ALTER TABLE "_org" ADD CONSTRAINT "_org_A_fkey" FOREIGN KEY ("A") REFERENCES "issueTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_org" ADD CONSTRAINT "_org_B_fkey" FOREIGN KEY ("B") REFERENCES "org"("id") ON DELETE CASCADE ON UPDATE CASCADE;
