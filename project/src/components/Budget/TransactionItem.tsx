import React from 'react';
import { Trash2 } from 'lucide-react';
import { Transaction } from '../../types/budget';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'text-green-600';
      case 'expense':
        return 'text-red-600 font-semibold';
      case 'investment':
        return 'text-blue-600';
      case 'rent':
        return 'text-purple-600 font-semibold';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-800">{transaction.description}</h3>
          <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {transaction.date.toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-medium ${getTypeColor(transaction.type)}`}>
          ${transaction.amount.toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="p-1 hover:bg-gray-100 rounded text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}