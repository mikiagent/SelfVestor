import { Todo } from '../types/todo';
import { PRIORITY_MULTIPLIERS } from './priorityUtils';

// Calculate single task weight based on batches and priority
function getTaskWeight(todo: Todo): number {
  // Each batch is treated as equivalent to a task with batch size of 1
  const numberOfBatches = todo.batches.length;
  
  // Base weight is determined by the number of batches
  const baseWeight = numberOfBatches;
  
  // Apply priority multiplier
  return baseWeight * PRIORITY_MULTIPLIERS[todo.priority];
}

// Calculate all task values in one pass
export function calculateTaskValues(todos: Todo[], monthlyBudget: number): Map<string, number> {
  const taskValues = new Map<string, number>();
  const weeklyBudget = monthlyBudget / 4; // Weekly spending allowance
  
  // Calculate total weight across all tasks
  const totalWeight = todos.reduce((sum, todo) => 
    sum + getTaskWeight(todo), 0
  );

  if (totalWeight === 0) {
    return taskValues;
  }

  // Calculate monetary values
  todos.forEach(todo => {
    const weight = getTaskWeight(todo);
    // Each batch's value is equal to the total task value divided by number of batches
    const totalValue = (weight / totalWeight) * weeklyBudget;
    const valuePerBatch = totalValue / todo.batches.length;
    taskValues.set(todo.id, Number(valuePerBatch.toFixed(2)));
  });

  return taskValues;
}