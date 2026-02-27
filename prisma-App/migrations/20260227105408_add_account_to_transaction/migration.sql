-- AlterTable
ALTER TABLE `TransactionStock` ADD COLUMN `accountId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TransactionStock` ADD CONSTRAINT `TransactionStock_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `BankAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
