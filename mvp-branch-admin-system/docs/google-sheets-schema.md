# 3) Google Sheets Schema

## ملاحظات عامة
- كل شيت يحتوي صف Header في الصف الأول.
- كل شيت يحتوي `id` فريد.
- التواريخ بصيغة ISO: `YYYY-MM-DD` أو `YYYY-MM-DDTHH:mm:ssZ`.
- الحقول النقدية أرقام decimal.

## 1) Users
| Column |
|---|
| id |
| fullName |
| username |
| passwordHash |
| role |
| allowedBranchIds (comma separated) |
| isActive |
| createdAt |
| updatedAt |

## 2) Sessions
| Column |
|---|
| id |
| userId |
| token |
| expiresAt |
| isActive |
| createdAt |

## 3) Branches
| Column |
|---|
| id |
| name |
| code |
| address |
| phone |
| isActive |
| openingCapital |
| createdAt |
| updatedAt |

## 4) DailyEntries
| Column |
|---|
| id |
| date |
| branchId |
| openingCapital |
| openingInventory |
| sales |
| returns |
| purchases |
| expenses |
| withdrawals |
| deposits |
| expectedCash |
| actualCash |
| inventoryCountValue |
| profitLoss |
| notes |
| createdBy |
| createdAt |

## 5) Purchases
| Column |
|---|
| id |
| date |
| branchId |
| supplierName |
| amount |
| notes |
| createdBy |
| createdAt |

## 6) Expenses
| Column |
|---|
| id |
| date |
| branchId |
| expenseType |
| amount |
| notes |
| createdBy |
| createdAt |

## 7) Deposits
| Column |
|---|
| id |
| date |
| branchId |
| amount |
| reason |
| createdBy |
| createdAt |

## 8) Withdrawals
| Column |
|---|
| id |
| date |
| branchId |
| amount |
| reason |
| createdBy |
| createdAt |

## 9) BranchTransfers
| Column |
|---|
| id |
| date |
| fromBranchId |
| toBranchId |
| transferType (GOODS/CASH/CAPITAL_SUPPORT/ADJUSTMENT) |
| amount |
| notes |
| createdBy |
| createdAt |

## 10) DeliveryAgents
| Column |
|---|
| id |
| fullName |
| phone |
| defaultBranchId |
| isActive |
| createdAt |
| updatedAt |

## 11) Orders
| Column |
|---|
| id |
| date |
| branchId |
| agentId |
| customerName |
| customerAddress |
| orderValue |
| deliveryFee |
| totalCollect |
| status |
| notes |
| createdAt |
| updatedAt |

## 12) DeliveryTrips
| Column |
|---|
| id |
| date |
| branchId |
| agentId |
| ordersCount |
| expectedCollect |
| actualCollect |
| shortageOverage |
| deliveredCount |
| returnedCount |
| postponedCount |
| cancelledCount |
| notes |
| createdBy |
| createdAt |

## 13) DeliverySettlements
| Column |
|---|
| id |
| date |
| branchId |
| agentId |
| tripId |
| expectedAmount |
| returnedAmount |
| shortageOverage |
| agentDue |
| notes |
| createdBy |
| createdAt |

## 14) InventoryCounts
| Column |
|---|
| id |
| date |
| branchId |
| openingCountValue |
| currentCountValue |
| expectedCountValue |
| varianceValue |
| notes |
| createdBy |
| createdAt |

## 15) CapitalTransactions
| Column |
|---|
| id |
| date |
| branchId |
| type (OPENING/SUPPORT/ADJUSTMENT/PNL_EFFECT) |
| amount |
| notes |
| createdBy |
| createdAt |

## 16) CashboxTransactions
| Column |
|---|
| id |
| date |
| branchId |
| direction (IN/OUT) |
| amount |
| reason |
| referenceType |
| referenceId |
| createdBy |
| createdAt |

## 17) Settings
| Column |
|---|
| id |
| key |
| value |
| description |
| updatedAt |
