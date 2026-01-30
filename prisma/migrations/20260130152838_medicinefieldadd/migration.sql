-- AlterTable
ALTER TABLE "medicines" ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "stock" INTEGER;
