/*
  Warnings:

  - The primary key for the `JsonData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "JsonData_name_key";

-- AlterTable
ALTER TABLE "JsonData" DROP CONSTRAINT "JsonData_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JsonData_pkey" PRIMARY KEY ("id");
