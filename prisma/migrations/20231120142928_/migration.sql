/*
  Warnings:

  - A unique constraint covering the columns `[isCancel]` on the table `task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isOwner]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report_id` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `planItemId` INTEGER NULL,
    ADD COLUMN `report_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `isCancel` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isOwner` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `emailSend` VARCHAR(191) NOT NULL,
    `emailCC` VARCHAR(191) NULL,
    `emailReceive` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `sprint_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `task_isCancel_key` ON `task`(`isCancel`);

-- CreateIndex
CREATE UNIQUE INDEX `user_isOwner_key` ON `user`(`isOwner`);

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `report`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_planItemId_fkey` FOREIGN KEY (`planItemId`) REFERENCES `plan_item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan_item` ADD CONSTRAINT `plan_item_sprint_id_fkey` FOREIGN KEY (`sprint_id`) REFERENCES `sprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
