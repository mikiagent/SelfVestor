import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BudgetSummary as BudgetSummaryType } from '../../types/budget';
import { getBudgetStatus } from '../../utils/budgetUtils';

interface BudgetSummaryProps {
  summary: BudgetSummaryType;
}

export function BudgetSummary({ summary }: BudgetSummaryProps) {
  const data = [
    { name: 'Rent', value: summary.totalRent },
    { name: 'Expenses', value: summary.totalExpenses },
    { name: 'Investments', value: summary.totalInvestments },
    { name: 'Available', value: summary.spendingBudget },
  ];

  const COLORS = {
    Rent: '#9333EA', // Purple
    Expenses: '#EF4444', // Red
    Investments: '#3B82F6', // Blue
    Available: '#10B981' // Green
  };

  const budgetStatus = getBudgetStatus(summary);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell 
                    key={entry.name} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                Total Income: <span className="font-medium text-green-600">${summary.totalIncome.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total Rent: <span className="font-medium text-purple-600">${summary.totalRent.toFixed(2)}</span>
                {summary.rentRatio > 0.3 && (
                  <span className="ml-2 text-red-500 text-xs font-medium">High rent</span>
                )}
              </p>
              <p className="text-sm text-gray-600">
                Total Expenses: <span className="font-medium text-red-600">${summary.totalExpenses.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total Investments: <span className="font-medium text-blue-600">${summary.totalInvestments.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Monthly Spending Budget: <span className="font-medium text-green-600">${summary.spendingBudget.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Status</h3>
            <div className="space-y-1">
              <p className={`text-sm ${budgetStatus.color}`}>
                {budgetStatus.status}
              </p>
              {summary.totalRent > 0 && (
                <p className={`text-sm ${summary.rentRatio > 0.3 ? 'text-red-600' : 'text-green-600'}`}>
                  {summary.rentRatio > 0.3 ? 'Rent exceeds 30% of income' : 'Healthy Rent Level'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}