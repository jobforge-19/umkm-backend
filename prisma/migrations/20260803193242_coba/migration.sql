-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'UMKM', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "Product_Categories" AS ENUM ('JAGUNG', 'BIJI_BIJIAN', 'SAYURAN', 'BUAH_BUAHAN', 'UMBI_UMBIAN', 'BERAS_DAN_GABAH', 'REMPAH_DAN_BUMBU');

-- CreateEnum
CREATE TYPE "Satuan" AS ENUM ('KG', 'IKAT', 'BOTOL', 'PACK', 'ONS', 'TON', 'GRAM', 'LITER', 'PCS', 'BOX', 'KARUNG');

-- CreateEnum
CREATE TYPE "Status_Produksi" AS ENUM ('PANEN', 'HABIS', 'PENGOLAHAN', 'READY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UMKM',
    "password" TEXT NOT NULL,
    "noWa" TEXT,
    "nik" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileUmkm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "businessName" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProfileUmkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileSupplier" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fotoProfile" TEXT,
    "bgProfile" TEXT,
    "businessName" TEXT,
    "bio" TEXT,
    "nib" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProfileSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "province" TEXT,
    "regency" TEXT,
    "street" TEXT NOT NULL,
    "details" TEXT,
    "profileUmkmId" INTEGER,
    "profileSupplierId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "id_supplier" INTEGER NOT NULL,
    "kategori" "Product_Categories" NOT NULL,
    "namaProduk" TEXT NOT NULL,
    "satuan" "Satuan" NOT NULL,
    "harga_satuan" INTEGER NOT NULL,
    "moq" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "stok" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "foto_produk" TEXT,
    "deskripsi" TEXT,
    "productStatus" "Status_Produksi" DEFAULT 'READY',
    "tersedia" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UmkmSupplierFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UmkmSupplierFollows_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE INDEX "_UmkmSupplierFollows_B_index" ON "_UmkmSupplierFollows"("B");

-- AddForeignKey
ALTER TABLE "ProfileUmkm" ADD CONSTRAINT "ProfileUmkm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileSupplier" ADD CONSTRAINT "ProfileSupplier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileUmkmId_fkey" FOREIGN KEY ("profileUmkmId") REFERENCES "ProfileUmkm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileSupplierId_fkey" FOREIGN KEY ("profileSupplierId") REFERENCES "ProfileSupplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "ProfileSupplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UmkmSupplierFollows" ADD CONSTRAINT "_UmkmSupplierFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileSupplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UmkmSupplierFollows" ADD CONSTRAINT "_UmkmSupplierFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfileUmkm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
