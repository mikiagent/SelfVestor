export type TransactionType = 'income' | 'expense' | 'investment' | 'rent';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  totalRent: number;
  spendingBudget: number;
  expenseRatio: number;
  rentRatio: number;
}