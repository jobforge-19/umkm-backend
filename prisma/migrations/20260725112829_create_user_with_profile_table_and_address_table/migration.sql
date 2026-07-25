/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Test";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'UMKM',
    "password" TEXT NOT NULL,
    "noWa" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "ProfileUmkm" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" BIGINT NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "umkmName" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileUmkm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfileSupplier" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" BIGINT NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "supplierName" TEXT,
    "bio" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "ProfileSupplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "kabupaten" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "jalan" TEXT NOT NULL,
    "detail" TEXT,
    "profileUmkmId" BIGINT,
    "profileSupplierId" BIGINT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Address_profileUmkmId_fkey" FOREIGN KEY ("profileUmkmId") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Address_profileSupplierId_fkey" FOREIGN KEY ("profileSupplierId") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UmkmSupplierFollows" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL,
    CONSTRAINT "_UmkmSupplierFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileSupplier" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UmkmSupplierFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfileUmkm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileUmkm_userId_key" ON "ProfileUmkm"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileSupplier_userId_key" ON "ProfileSupplier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileUmkmId_key" ON "Address"("profileUmkmId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileSupplierId_key" ON "Address"("profileSupplierId");

-- CreateIndex
CREATE UNIQUE INDEX "_UmkmSupplierFollows_AB_unique" ON "_UmkmSupplierFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UmkmSupplierFollows_B_index" ON "_UmkmSupplierFollows"("B");
