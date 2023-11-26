-- AlterTable
ALTER TABLE `channel` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `icon` VARCHAR(191) NULL,
    MODIFY `type` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `company` MODIFY `logo` VARCHAR(191) NULL,
    MODIFY `website` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `mission` VARCHAR(191) NULL,
    MODIFY `coreValue` VARCHAR(191) NULL,
    MODIFY `slogan` VARCHAR(191) NULL,
    MODIFY `banner` VARCHAR(191) NULL,
    MODIFY `expiredTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `employees` MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `school` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `network` VARCHAR(191) NULL,
    MODIFY `website` VARCHAR(191) NULL,
    MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `section` VARCHAR(191) NULL,
    MODIFY `favoriteImage` VARCHAR(191) NULL,
    MODIFY `toDate` DATETIME(3) NULL,
    MODIFY `birthday` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `milestone` MODIFY `linkVideo` VARCHAR(191) NULL,
    MODIFY `datetime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sprint` MODIFY `endDate` DATETIME(3) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `progress` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `deadline` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tim` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `startDate` DATETIME(3) NULL,
    MODIFY `endDate` DATETIME(3) NULL,
    MODIFY `slogan` VARCHAR(191) NULL;
