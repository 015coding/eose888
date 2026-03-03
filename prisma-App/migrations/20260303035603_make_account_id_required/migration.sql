/*
  Warnings:

  - Made the column `accountId` on table `TransactionStock` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `TransactionStock` DROP FOREIGN KEY `TransactionStock_accountId_fkey`;

-- AlterTable
ALTER TABLE `TransactionStock` MODIFY `accountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TransactionStock` ADD CONSTRAINT `TransactionStock_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
