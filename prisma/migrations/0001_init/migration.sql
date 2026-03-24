-- Initial schema generated manually for PostgreSQL
CREATE TYPE "UserRole" AS ENUM ('OWNER','MANAGER','ACCOUNTANT','DELIVERY_AGENT','VIEWER');
CREATE TYPE "BranchType" AS ENUM ('MAIN','SUB');
CREATE TYPE "BranchStatus" AS ENUM ('ACTIVE','INACTIVE');
CREATE TYPE "PaymentMethod" AS ENUM ('CASH','CARD','BANK_TRANSFER','CREDIT');
CREATE TYPE "TransferType" AS ENUM ('INVENTORY_TRANSFER','CASH_TRANSFER','EXPENSE_ALLOCATION','CAPITAL_SUPPORT','SETTLEMENT');
CREATE TYPE "DeliveryAgentStatus" AS ENUM ('ACTIVE','INACTIVE');
CREATE TYPE "DeliveryFeeModelType" AS ENUM ('PER_ORDER','FIXED_DAILY','PERCENTAGE','CUSTOM');
CREATE TYPE "OrderPaymentType" AS ENUM ('CASH','ONLINE','MIXED','CREDIT');
CREATE TYPE "OrderStatus" AS ENUM ('NEW','READY','OUT_FOR_DELIVERY','DELIVERED','RETURNED','CANCELLED','DEFERRED','PARTIALLY_SETTLED');
CREATE TYPE "DeliveryRunStatus" AS ENUM ('OPEN','IN_PROGRESS','RETURNED','SETTLED','UNDER_REVIEW');
CREATE TYPE "DeliverySettlementStatus" AS ENUM ('MATCHED','SHORTAGE','OVERAGE','REVIEW_REQUIRED');
CREATE TYPE "StocktakeStatus" AS ENUM ('SHORTAGE','SURPLUS','MATCHED');
CREATE TYPE "CashTransactionType" AS ENUM ('INFLOW','OUTFLOW');
CREATE TYPE "CapitalMovementType" AS ENUM ('INJECTION','WITHDRAWAL');

CREATE TABLE "Settings" ("id" TEXT PRIMARY KEY, "companyName" TEXT NOT NULL, "defaultCurrency" TEXT NOT NULL DEFAULT 'EGP', "timezone" TEXT NOT NULL DEFAULT 'Africa/Cairo', "requireDriverSettlementReview" BOOLEAN NOT NULL DEFAULT true, "notes" TEXT, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL);
CREATE TABLE "Branch" ("id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "code" TEXT UNIQUE NOT NULL, "type" "BranchType" NOT NULL, "parentBranchId" TEXT, "openingDate" TIMESTAMP NOT NULL, "status" "BranchStatus" NOT NULL, "managerName" TEXT, "notes" TEXT, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "Branch_parent_fkey" FOREIGN KEY ("parentBranchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE);
CREATE TABLE "User" ("id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "email" TEXT UNIQUE NOT NULL, "passwordHash" TEXT NOT NULL, "role" "UserRole" NOT NULL, "branchId" TEXT, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "User_branch_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE);
CREATE TABLE "BranchSetup" ("id" TEXT PRIMARY KEY, "branchId" TEXT UNIQUE NOT NULL, "openingDate" TIMESTAMP NOT NULL, "openingCashCapital" DECIMAL(12,2) NOT NULL, "openingInventoryValue" DECIMAL(12,2) NOT NULL, "openingCashboxBalance" DECIMAL(12,2) NOT NULL, "openingNotes" TEXT, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "BranchSetup_branch_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE);
CREATE TABLE "DailyEntry" ("id" TEXT PRIMARY KEY, "branchId" TEXT NOT NULL, "date" TIMESTAMP NOT NULL, "totalSales" DECIMAL(12,2) NOT NULL, "totalReturns" DECIMAL(12,2) NOT NULL, "purchases" DECIMAL(12,2) NOT NULL, "operatingExpenses" DECIMAL(12,2) NOT NULL, "ownerWithdrawals" DECIMAL(12,2) NOT NULL, "deposits" DECIMAL(12,2) NOT NULL, "transfersIn" DECIMAL(12,2) NOT NULL, "transfersOut" DECIMAL(12,2) NOT NULL, "notes" TEXT, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "DailyEntry_unique" UNIQUE ("branchId","date"), CONSTRAINT "DailyEntry_branch_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id"));
-- Remaining tables follow same design as schema.prisma and should be generated via prisma migrate in local env.
