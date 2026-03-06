/*
  Warnings:

  - You are about to alter the column `quantity` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,4)` to `Decimal(18,8)`.
  - You are about to alter the column `avgCost` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,4)` to `Decimal(18,8)`.
  - You are about to alter the column `quantity` on the `TransactionStock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,4)` to `Decimal(18,8)`.
  - You are about to alter the column `price` on the `TransactionStock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,4)` to `Decimal(18,8)`.

*/
-- AlterTable
ALTER TABLE `Holding` MODIFY `quantity` DECIMAL(18, 8) NOT NULL,
    MODIFY `avgCost` DECIMAL(18, 8) NOT NULL;

-- AlterTable
ALTER TABLE `TransactionStock` MODIFY `quantity` DECIMAL(18, 8) NOT NULL,
    MODIFY `price` DECIMAL(18, 8) NOT NULL;

-- CreateTable
CREATE TABLE `StockHistoryDaily` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StockHistoryDaily_symbol_time_key`(`symbol`, `time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
