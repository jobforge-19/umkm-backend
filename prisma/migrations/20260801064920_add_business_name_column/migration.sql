/*
  Warnings:

  - You are about to drop the column `detail` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `provinsi` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `supplierName` on the `ProfileSupplier` table. All the data in the column will be lost.
  - You are about to drop the column `umkmName` on the `ProfileUmkm` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "province" TEXT,
    "regency" TEXT,
    "street" TEXT NOT NULL,
    "details" TEXT,
    "profileUmkmId" INTEGER,
    "profileSupplierId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Address_profileUmkmId_fkey" FOREIGN KEY ("profileUmkmId") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_profileSupplierId_fkey" FOREIGN KEY ("profileSupplierId") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("created_at", "id", "profileSupplierId", "profileUmkmId", "regency", "street", "updated_at") SELECT "created_at", "id", "profileSupplierId", "profileUmkmId", "regency", "street", "updated_at" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_profileUmkmId_key" ON "Address"("profileUmkmId");
CREATE UNIQUE INDEX "Address_profileSupplierId_key" ON "Address"("profileSupplierId");
CREATE TABLE "new_ProfileSupplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "businessName" TEXT,
    "bio" TEXT,
    "nib" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileSupplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfileSupplier" ("bgProfile", "bio", "created_at", "fotoProfile", "id", "nib", "updated_at", "userId") SELECT "bgProfile", "bio", "created_at", "fotoProfile", "id", "nib", "updated_at", "userId" FROM "ProfileSupplier";
DROP TABLE "ProfileSupplier";
ALTER TABLE "new_ProfileSupplier" RENAME TO "ProfileSupplier";
CREATE UNIQUE INDEX "ProfileSupplier_userId_key" ON "ProfileSupplier"("userId");
CREATE TABLE "new_ProfileUmkm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "businessName" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileUmkm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfileUmkm" ("bgProfile", "bio", "created_at", "fotoProfile", "id", "updated_at", "userId") SELECT "bgProfile", "bio", "created_at", "fotoProfile", "id", "updated_at", "userId" FROM "ProfileUmkm";
DROP TABLE "ProfileUmkm";
ALTER TABLE "new_ProfileUmkm" RENAME TO "ProfileUmkm";
CREATE UNIQUE INDEX "ProfileUmkm_userId_key" ON "ProfileUmkm"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
