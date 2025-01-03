import React, { useState } from 'react';
import { BudgetSummary } from './BudgetSummary';
import { TransactionList } from './TransactionList';
import { AddTransactionForm } from './AddTransactionForm';
import { SpendingAllowance } from './SpendingAllowance';
import { LoadingSpinner } from '../LoadingSpinner';
import { useBudget } from '../../hooks/useBudget';
import { useFirestore } from '../../hooks/useFirestore';
import { calculateSpendingAllowance } from '../../utils/spendingCalculator';

export function BudgetPage() {
  const { transactions, addTransaction, deleteTransaction, budgetSummary } = useBudget();
  const [showChart, setShowChart] = useState(true);
  const spendingAllowance = calculateSpendingAllowance(budgetSummary.spendingBudget);
  const { loading } = useFirestore();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Monthly Budget</h1>
        <button
          onClick={() => setShowChart(!showChart)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
      </div>

      <SpendingAllowance allowance={spendingAllowance} />

      {showChart && (
        <div className="mb-8">
          <BudgetSummary summary={budgetSummary} />
        </div>
      )}

      <div className="space-y-8">
        <div className="relative pointer-events-auto" data-tutorial="add-transaction">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add Transaction</h2>
          <AddTransactionForm onAdd={addTransaction} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transactions</h2>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}