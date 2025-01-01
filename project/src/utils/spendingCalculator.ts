import { loadProgressHistory } from './progressStorage';

export interface SpendingAllowance {
  monthlyBudget: number;
  availableAmount: number;
}

export function calculateSpendingAllowance(monthlyBudget: number): SpendingAllowance {
  const progressHistory = loadProgressHistory();
  const dates = Object.keys(progressHistory).sort().reverse();
  
  // Check last two days
  let consecutiveGreenDays = 0;
  for (let i = 0; i < Math.min(2, dates.length); i++) {
    if (progressHistory[dates[i]] >= 100) {
      consecutiveGreenDays++;
    } else {
      break;
    }
  }

  const availableAmount = consecutiveGreenDays >= 2 ? monthlyBudget * 0.25 : 0;

  return {
    monthlyBudget,
    availableAmount
  };
}