import { useState, useEffect } from 'react';
import { Transaction, BudgetSummary } from '../types/budget';

const BUDGET_STORAGE_KEY = 'monthly-budget-transactions';

export function useBudget() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
    } catch (error) {
      console.error('Error loading budget data:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date(),
    };
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const calculateBudgetSummary = (): BudgetSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalRent = transactions
      .filter(t => t.type === 'rent')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalInvestments = transactions
      .filter(t => t.type === 'investment')
      .reduce((sum, t) => sum + t.amount, 0);

    const spendingBudget = totalIncome - totalExpenses - totalInvestments - totalRent;
    const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 0;
    const rentRatio = totalIncome > 0 ? totalRent / totalIncome : 0;

    return {
      totalIncome,
      totalExpenses,
      totalInvestments,
      totalRent,
      spendingBudget,
      expenseRatio,
      rentRatio
    };
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    budgetSummary: calculateBudgetSummary()
  };
}