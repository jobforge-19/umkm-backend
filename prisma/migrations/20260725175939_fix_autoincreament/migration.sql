/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `profileSupplierId` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `profileUmkmId` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ProfileSupplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ProfileSupplier` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `ProfileSupplier` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ProfileUmkm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ProfileUmkm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `ProfileUmkm` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `A` on the `_UmkmSupplierFollows` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `B` on the `_UmkmSupplierFollows` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provinsi" TEXT NOT NULL,
    "regency" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "detail" TEXT,
    "profileUmkmId" INTEGER,
    "profileSupplierId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Address_profileUmkmId_fkey" FOREIGN KEY ("profileUmkmId") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_profileSupplierId_fkey" FOREIGN KEY ("profileSupplierId") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("created_at", "detail", "id", "profileSupplierId", "profileUmkmId", "provinsi", "regency", "street", "updated_at") SELECT "created_at", "detail", "id", "profileSupplierId", "profileUmkmId", "provinsi", "regency", "street", "updated_at" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_profileUmkmId_key" ON "Address"("profileUmkmId");
CREATE UNIQUE INDEX "Address_profileSupplierId_key" ON "Address"("profileSupplierId");
CREATE TABLE "new_ProfileSupplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "supplierName" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileSupplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfileSupplier" ("bgProfile", "bio", "created_at", "fotoProfile", "id", "supplierName", "updated_at", "userId") SELECT "bgProfile", "bio", "created_at", "fotoProfile", "id", "supplierName", "updated_at", "userId" FROM "ProfileSupplier";
DROP TABLE "ProfileSupplier";
ALTER TABLE "new_ProfileSupplier" RENAME TO "ProfileSupplier";
CREATE UNIQUE INDEX "ProfileSupplier_userId_key" ON "ProfileSupplier"("userId");
CREATE TABLE "new_ProfileUmkm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "umkmName" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileUmkm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfileUmkm" ("bgProfile", "bio", "created_at", "fotoProfile", "id", "umkmName", "updated_at", "userId") SELECT "bgProfile", "bio", "created_at", "fotoProfile", "id", "umkmName", "updated_at", "userId" FROM "ProfileUmkm";
DROP TABLE "ProfileUmkm";
ALTER TABLE "new_ProfileUmkm" RENAME TO "ProfileUmkm";
CREATE UNIQUE INDEX "ProfileUmkm_userId_key" ON "ProfileUmkm"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'UMKM',
    "password" TEXT NOT NULL,
    "noWa" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_User" ("created_at", "email", "id", "noWa", "password", "role", "updated_at", "username") SELECT "created_at", "email", "id", "noWa", "password", "role", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new__UmkmSupplierFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UmkmSupplierFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UmkmSupplierFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__UmkmSupplierFollows" ("A", "B") SELECT "A", "B" FROM "_UmkmSupplierFollows";
DROP TABLE "_UmkmSupplierFollows";
ALTER TABLE "new__UmkmSupplierFollows" RENAME TO "_UmkmSupplierFollows";
CREATE UNIQUE INDEX "_UmkmSupplierFollows_AB_unique" ON "_UmkmSupplierFollows"("A", "B");
CREATE INDEX "_UmkmSupplierFollows_B_index" ON "_UmkmSupplierFollows"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
