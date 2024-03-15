-- CreateTable
CREATE TABLE "org" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "strength" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL DEFAULT '',
    "org_owner" UUID,

    CONSTRAINT "org_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "org" ADD CONSTRAINT "org_org_owner_fkey" FOREIGN KEY ("org_owner") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
