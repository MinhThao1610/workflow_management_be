-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `mission` VARCHAR(191) NOT NULL,
    `coreValue` VARCHAR(191) NOT NULL,
    `slogan` VARCHAR(191) NOT NULL,
    `banner` VARCHAR(191) NOT NULL,
    `expiredTime` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'hoat-dong',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `company_name_key`(`name`),
    UNIQUE INDEX `company_phone_key`(`phone`),
    UNIQUE INDEX `company_email_key`(`email`),
    UNIQUE INDEX `company_status_key`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'hoat-dong',
    `type` ENUM('function', 'project') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `slogan` VARCHAR(191) NOT NULL,
    `company_id` INTEGER NOT NULL,
    `isCancelTask` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `tim_name_key`(`name`),
    UNIQUE INDEX `tim_status_key`(`status`),
    UNIQUE INDEX `tim_type_key`(`type`),
    UNIQUE INDEX `tim_isPublic_key`(`isPublic`),
    UNIQUE INDEX `tim_isCancelTask_key`(`isCancelTask`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leaders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `tim_id` INTEGER NOT NULL,

    UNIQUE INDEX `leaders_employee_id_key`(`employee_id`),
    UNIQUE INDEX `leaders_tim_id_key`(`tim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'SYSTEMADMIN') NOT NULL DEFAULT 'USER',
    `avatar` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `disable` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_name_key`(`name`),
    UNIQUE INDEX `user_password_key`(`password`),
    UNIQUE INDEX `user_phone_key`(`phone`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'SYSTEMADMIN') NOT NULL DEFAULT 'USER',
    `avatar` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `network` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `favoriteImage` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `isWorking` BOOLEAN NOT NULL DEFAULT true,
    `company_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `tim_id` INTEGER NOT NULL,
    `disable` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employees_name_key`(`name`),
    UNIQUE INDEX `employees_phone_key`(`phone`),
    UNIQUE INDEX `employees_email_key`(`email`),
    UNIQUE INDEX `employees_fromDate_key`(`fromDate`),
    UNIQUE INDEX `employees_isWorking_key`(`isWorking`),
    UNIQUE INDEX `employees_company_id_key`(`company_id`),
    UNIQUE INDEX `employees_user_id_key`(`user_id`),
    UNIQUE INDEX `employees_disable_key`(`disable`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configStatusTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `type` ENUM('doing', 'veryfying', 'done') NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `tim_id` INTEGER NOT NULL,

    UNIQUE INDEX `configStatusTask_name_key`(`name`),
    UNIQUE INDEX `configStatusTask_color_key`(`color`),
    UNIQUE INDEX `configStatusTask_type_key`(`type`),
    UNIQUE INDEX `configStatusTask_tim_id_key`(`tim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `tim_id` INTEGER NOT NULL,

    UNIQUE INDEX `priority_name_key`(`name`),
    UNIQUE INDEX `priority_color_key`(`color`),
    UNIQUE INDEX `priority_tim_id_key`(`tim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sprint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `progress` VARCHAR(191) NOT NULL,
    `type` ENUM('SPRINT', 'TEST') NOT NULL,
    `leader_id` INTEGER NOT NULL,
    `tim_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sprint_title_key`(`title`),
    UNIQUE INDEX `sprint_type_key`(`type`),
    UNIQUE INDEX `sprint_leader_id_key`(`leader_id`),
    UNIQUE INDEX `sprint_tim_id_key`(`tim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,
    `priority_id` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `owner_id` INTEGER NOT NULL,
    `verifier_id` INTEGER NOT NULL,
    `sprint_id` INTEGER NOT NULL,
    `type` ENUM('task', 'bug') NOT NULL,
    `isPrivate` BOOLEAN NOT NULL DEFAULT false,
    `testObject_id` INTEGER NOT NULL,
    `testcase_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `task_title_key`(`title`),
    UNIQUE INDEX `task_code_key`(`code`),
    UNIQUE INDEX `task_status_id_key`(`status_id`),
    UNIQUE INDEX `task_creator_id_key`(`creator_id`),
    UNIQUE INDEX `task_owner_id_key`(`owner_id`),
    UNIQUE INDEX `task_verifier_id_key`(`verifier_id`),
    UNIQUE INDEX `task_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exchange` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `task_id` INTEGER NOT NULL,

    UNIQUE INDEX `exchange_creator_id_key`(`creator_id`),
    UNIQUE INDEX `exchange_index_key`(`index`),
    UNIQUE INDEX `exchange_task_id_key`(`task_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `exchange_id` INTEGER NOT NULL,
    `testOject_id` INTEGER NOT NULL,
    `milestone_id` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,
    `channel_id` INTEGER NOT NULL,

    UNIQUE INDEX `file_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `index` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `task_id` INTEGER NOT NULL,

    UNIQUE INDEX `checklist_content_key`(`content`),
    UNIQUE INDEX `checklist_index_key`(`index`),
    UNIQUE INDEX `checklist_status_key`(`status`),
    UNIQUE INDEX `checklist_task_id_key`(`task_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testObject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `sprint_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `testObject_title_key`(`title`),
    UNIQUE INDEX `testObject_creator_id_key`(`creator_id`),
    UNIQUE INDEX `testObject_sprint_id_key`(`sprint_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testcase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `scenario` VARCHAR(191) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `tester_id` INTEGER NOT NULL,
    `expectedResult` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `sprint_id` INTEGER NOT NULL,
    `testObject_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `testcase_title_key`(`title`),
    UNIQUE INDEX `testcase_creator_id_key`(`creator_id`),
    UNIQUE INDEX `testcase_tester_id_key`(`tester_id`),
    UNIQUE INDEX `testcase_status_key`(`status`),
    UNIQUE INDEX `testcase_sprint_id_key`(`sprint_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `milestone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `linkVideo` VARCHAR(191) NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `company_id` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `milestone_title_key`(`title`),
    UNIQUE INDEX `milestone_content_key`(`content`),
    UNIQUE INDEX `milestone_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `milestone_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `like_employee_id_key`(`employee_id`),
    UNIQUE INDEX `like_milestone_id_key`(`milestone_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `milestone_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `comment_content_key`(`content`),
    UNIQUE INDEX `comment_employee_id_key`(`employee_id`),
    UNIQUE INDEX `comment_milestone_id_key`(`milestone_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lib` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `company_id` INTEGER NOT NULL,
    `isShow` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `lib_title_key`(`title`),
    UNIQUE INDEX `lib_content_key`(`content`),
    UNIQUE INDEX `lib_type_key`(`type`),
    UNIQUE INDEX `lib_isShow_key`(`isShow`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `actionUrl` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `tim_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `notification_sender_id_key`(`sender_id`),
    UNIQUE INDEX `notification_content_key`(`content`),
    UNIQUE INDEX `notification_actionUrl_key`(`actionUrl`),
    UNIQUE INDEX `notification_isRead_key`(`isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receiver` (
    `receiver_id` INTEGER NOT NULL,
    `noti_id` INTEGER NOT NULL,

    UNIQUE INDEX `receiver_receiver_id_key`(`receiver_id`),
    UNIQUE INDEX `receiver_noti_id_key`(`noti_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `isShow` BOOLEAN NOT NULL DEFAULT true,
    `tim_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `channel_title_key`(`title`),
    UNIQUE INDEX `channel_creator_id_key`(`creator_id`),
    UNIQUE INDEX `channel_isShow_key`(`isShow`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NOT NULL,
    `expireTime` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_password_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tim` ADD CONSTRAINT `tim_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaders` ADD CONSTRAINT `leaders_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaders` ADD CONSTRAINT `leaders_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configStatusTask` ADD CONSTRAINT `configStatusTask_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `priority` ADD CONSTRAINT `priority_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sprint` ADD CONSTRAINT `sprint_leader_id_fkey` FOREIGN KEY (`leader_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sprint` ADD CONSTRAINT `sprint_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `configStatusTask`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_priority_id_fkey` FOREIGN KEY (`priority_id`) REFERENCES `priority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_verifier_id_fkey` FOREIGN KEY (`verifier_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_sprint_id_fkey` FOREIGN KEY (`sprint_id`) REFERENCES `sprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_testObject_id_fkey` FOREIGN KEY (`testObject_id`) REFERENCES `testObject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_testcase_id_fkey` FOREIGN KEY (`testcase_id`) REFERENCES `testcase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exchange` ADD CONSTRAINT `exchange_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exchange` ADD CONSTRAINT `exchange_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_exchange_id_fkey` FOREIGN KEY (`exchange_id`) REFERENCES `exchange`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_testOject_id_fkey` FOREIGN KEY (`testOject_id`) REFERENCES `testObject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_milestone_id_fkey` FOREIGN KEY (`milestone_id`) REFERENCES `milestone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist` ADD CONSTRAINT `checklist_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testObject` ADD CONSTRAINT `testObject_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testObject` ADD CONSTRAINT `testObject_sprint_id_fkey` FOREIGN KEY (`sprint_id`) REFERENCES `sprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testcase` ADD CONSTRAINT `testcase_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testcase` ADD CONSTRAINT `testcase_tester_id_fkey` FOREIGN KEY (`tester_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testcase` ADD CONSTRAINT `testcase_sprint_id_fkey` FOREIGN KEY (`sprint_id`) REFERENCES `sprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testcase` ADD CONSTRAINT `testcase_testObject_id_fkey` FOREIGN KEY (`testObject_id`) REFERENCES `testObject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `milestone` ADD CONSTRAINT `milestone_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `milestone` ADD CONSTRAINT `milestone_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_milestone_id_fkey` FOREIGN KEY (`milestone_id`) REFERENCES `milestone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_milestone_id_fkey` FOREIGN KEY (`milestone_id`) REFERENCES `milestone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lib` ADD CONSTRAINT `lib_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receiver` ADD CONSTRAINT `receiver_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receiver` ADD CONSTRAINT `receiver_noti_id_fkey` FOREIGN KEY (`noti_id`) REFERENCES `notification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel` ADD CONSTRAINT `channel_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel` ADD CONSTRAINT `channel_tim_id_fkey` FOREIGN KEY (`tim_id`) REFERENCES `tim`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channel` ADD CONSTRAINT `channel_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_password_token` ADD CONSTRAINT `reset_password_token_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
