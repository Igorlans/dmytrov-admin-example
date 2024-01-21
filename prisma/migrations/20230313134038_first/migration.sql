-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" CHAR(70) NOT NULL,
    "descr" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
