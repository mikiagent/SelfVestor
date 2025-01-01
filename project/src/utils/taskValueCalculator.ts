import { Todo } from '../types/todo';
import { PRIORITY_MULTIPLIERS } from './priorityUtils';

const CATEGORY_WEIGHTS = {
  daily: 0.5,
  weekly: 0.3,
  monthly: 0.2
} as const;

// Calculate single task weight
function getTaskWeight(todo: Todo): number {
  return CATEGORY_WEIGHTS[todo.category] * 
         PRIORITY_MULTIPLIERS[todo.priority] * 
         (1 / todo.total);
}

// Calculate all task values in one pass
export function calculateTaskValues(todos: Todo[], monthlyBudget: number): Map<string, number> {
  const taskValues = new Map<string, number>();
  
  // Calculate total weight in first pass
  const totalWeight = todos.reduce((sum, todo) => 
    sum + getTaskWeight(todo), 0
  );

  if (totalWeight === 0) {
    return taskValues;
  }

  // Calculate monetary values in second pass
  todos.forEach(todo => {
    const weight = getTaskWeight(todo);
    const value = (weight / totalWeight) * monthlyBudget;
    taskValues.set(todo.id, Number(value.toFixed(2)));
  });

  return taskValues;
}