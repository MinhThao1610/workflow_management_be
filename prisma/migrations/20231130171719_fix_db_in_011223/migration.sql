/*
  Warnings:

  - Added the required column `isShow` to the `milestone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `milestone` ADD COLUMN `isShow` BOOLEAN NOT NULL;
