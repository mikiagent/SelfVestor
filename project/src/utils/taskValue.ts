import { Todo } from '../types/todo';
import { PRIORITY_MULTIPLIERS } from './priorityUtils';

// Calculate raw task weight without monetary value
function calculateTaskWeight(todo: Todo): number {
  const categoryWeights = {
    daily: 0.5,
    weekly: 0.3,
    monthly: 0.2
  };

  return categoryWeights[todo.category] * 
         PRIORITY_MULTIPLIERS[todo.priority] * 
         (1 / todo.total);
}

// Get all tasks' weights to calculate proportions
function getTotalWeight(todos: Todo[]): number {
  return todos.reduce((sum, todo) => sum + calculateTaskWeight(todo), 0);
}

export function calculateTaskValue(todo: Todo, monthlyBudget: number, allTodos: Todo[]): number {
  const totalWeight = getTotalWeight(allTodos);
  if (totalWeight === 0) return 0;

  const taskWeight = calculateTaskWeight(todo);
  const taskValue = (taskWeight / totalWeight) * monthlyBudget;

  return Number(taskValue.toFixed(2));
}