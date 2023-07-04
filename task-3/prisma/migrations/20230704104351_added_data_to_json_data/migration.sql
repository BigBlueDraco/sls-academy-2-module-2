/*
  Warnings:

  - Added the required column `data` to the `JsonData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JsonData" ADD COLUMN     "data" TEXT NOT NULL;
