-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "order" INTEGER;

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descr" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tariffes" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "textMob" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tariffes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "tariff" TEXT NOT NULL,
    "square" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "homeNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
