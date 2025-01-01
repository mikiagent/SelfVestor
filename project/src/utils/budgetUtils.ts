import { BudgetSummary } from '../types/budget';

export function getBudgetStatus(summary: BudgetSummary): {
  status: string;
  color: string;
} {
  const totalSpent = summary.totalRent + summary.totalExpenses + summary.totalInvestments;
  const spendingRatio = summary.totalIncome > 0 ? totalSpent / summary.totalIncome : 0;

  if (spendingRatio >= 0.9) {
    return {
      status: 'Critical Budget Alert',
      color: 'text-red-600'
    };
  } else if (spendingRatio >= 0.75) {
    return {
      status: 'High Spending Warning',
      color: 'text-yellow-600'
    };
  } else {
    return {
      status: 'Healthy Budget Status',
      color: 'text-green-600'
    };
  }
}

export function isBudgetSetup(summary: BudgetSummary): boolean {
  return summary.totalIncome > 0 && (
    summary.totalExpenses > 0 || 
    summary.totalRent > 0 || 
    summary.totalInvestments > 0
  );
}