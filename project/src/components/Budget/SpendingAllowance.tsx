import React from 'react';
import { SpendingAllowance as SpendingAllowanceType } from '../../utils/spendingCalculator';
import { Wallet } from 'lucide-react';
import { SpendingInfoTooltip } from '../SpendingInfoTooltip';

interface SpendingAllowanceProps {
  allowance: SpendingAllowanceType;
}

export function SpendingAllowance({ allowance }: SpendingAllowanceProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Progress-Based Spending</h2>
        <SpendingInfoTooltip />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Monthly Spending Budget</p>
          <p className="text-2xl font-bold text-gray-900">
            ${allowance.monthlyBudget.toFixed(2)}
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-sm text-gray-600 mb-1">Amount Available</p>
          <p className={`text-3xl font-bold ${allowance.availableAmount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
            ${allowance.availableAmount.toFixed(2)}
          </p>
          {allowance.availableAmount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Unlocked by completing 2 days of goals
            </p>
          )}
        </div>
      </div>
    </div>
  );
}