import React from 'react';
import { Todo } from '../types/todo';
import { useTaskValues } from '../hooks/useTaskValues';
import { SpendingInfoTooltip } from './SpendingInfoTooltip';
import { calculateSpendingAllowance } from '../utils/spendingCalculator';

interface GoalsHeaderProps {
  todos: Todo[];
  monthlyBudget: number;
}

export function GoalsHeader({ todos, monthlyBudget }: GoalsHeaderProps) {
  const taskValues = useTaskValues(todos, monthlyBudget);
  const { availableAmount } = calculateSpendingAllowance(monthlyBudget);
  
  const earnedAmount = todos.reduce((sum, todo) => {
    const taskValue = taskValues.get(todo.id) || 0;
    const completedRatio = (todo.total - todo.remaining) / todo.total;
    return sum + (taskValue * completedRatio);
  }, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Goals Progress</h2>
          <SpendingInfoTooltip />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-green-600">${earnedAmount.toFixed(2)}</span>
          <span className="text-gray-600">earned out of</span>
          <span className="text-xl font-bold text-gray-900">${monthlyBudget.toFixed(2)}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-gray-600">Available:</span>
          <span className={`text-2xl font-bold ${availableAmount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
            ${availableAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}