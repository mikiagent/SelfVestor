import { useMemo } from 'react';
import { Todo } from '../types/todo';
import { calculateTaskValues } from '../utils/taskValueCalculator';

export function useTaskValues(todos: Todo[], monthlyBudget: number) {
  // Memoize task values to prevent unnecessary recalculations
  const taskValues = useMemo(() => 
    calculateTaskValues(todos, monthlyBudget),
    [todos, monthlyBudget]
  );

  return taskValues;
}