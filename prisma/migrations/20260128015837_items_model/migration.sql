-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('FRUIT', 'LEGUME', 'DRINK', 'MEAT', 'BAKERY');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('KG', 'LITER', 'UNIT');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ItemType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" "UnitType" NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
