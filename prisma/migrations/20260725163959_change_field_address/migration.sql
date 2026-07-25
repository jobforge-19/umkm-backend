/*
  Warnings:

  - You are about to drop the column `jalan` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `kabupaten` on the `Address` table. All the data in the column will be lost.
  - Added the required column `regency` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "provinsi" TEXT NOT NULL,
    "regency" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "detail" TEXT,
    "profileUmkmId" BIGINT,
    "profileSupplierId" BIGINT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Address_profileUmkmId_fkey" FOREIGN KEY ("profileUmkmId") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_profileSupplierId_fkey" FOREIGN KEY ("profileSupplierId") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("created_at", "detail", "id", "profileSupplierId", "profileUmkmId", "provinsi", "updated_at") SELECT "created_at", "detail", "id", "profileSupplierId", "profileUmkmId", "provinsi", "updated_at" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_profileUmkmId_key" ON "Address"("profileUmkmId");
CREATE UNIQUE INDEX "Address_profileSupplierId_key" ON "Address"("profileSupplierId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
