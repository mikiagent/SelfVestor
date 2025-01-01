import React from 'react';
import { Transaction } from '../../types/budget';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const sortedTransactions = [...transactions].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="space-y-2">
      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-4">No transactions yet</p>
      )}
    </div>
  );
}