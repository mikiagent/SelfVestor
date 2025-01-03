import { useCallback } from 'react';
import { Transaction, BudgetSummary } from '../types/budget';
import { useFirestore } from './useFirestore';
import { 
  serializeTransactions, 
  deserializeTransactions 
} from '../services/transactionService';

export function useBudget() {
  const { data, updateData } = useFirestore();
  const transactions = deserializeTransactions(data?.transactions || []);

  const addTransaction = useCallback(async (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date(),
    };
    
    const updatedTransactions = [...transactions, transaction];
    await updateData({ 
      transactions: serializeTransactions(updatedTransactions)
    });
  }, [transactions, updateData]);

  const deleteTransaction = useCallback(async (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    await updateData({ 
      transactions: serializeTransactions(updatedTransactions)
    });
  }, [transactions, updateData]);

  const calculateBudgetSummary = useCallback((): BudgetSummary => {
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
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    budgetSummary: calculateBudgetSummary()
  };
}