import { Todo, TodoProgress } from '../types/todo';
import { Settings } from '../types/settings';

// Calculate progress for a specific category
function calculateCategoryProgress(todos: Todo[], category: 'daily' | 'weekly' | 'monthly'): number {
  const categoryTodos = todos.filter(todo => todo.category === category);
  if (categoryTodos.length === 0) return 100; // Return 100% if no todos exist

  const totalProgress = categoryTodos.reduce((sum, todo) => {
    const completedCount = todo.batches
      .filter(batch => batch.completed)
      .reduce((sum, batch) => sum + batch.count, 0);
    return sum + (completedCount / todo.total);
  }, 0);

  return (totalProgress / categoryTodos.length) * 100;
}

// Check if a todo should be reset based on its category and settings
function shouldResetTodo(todo: Todo, settings: Settings): boolean {
  const now = new Date();
  const todoDate = new Date(todo.createdAt);
  
  switch (todo.category) {
    case 'daily':
      return todoDate.getDate() !== now.getDate() ||
             todoDate.getMonth() !== now.getMonth() ||
             todoDate.getFullYear() !== now.getFullYear();
      
    case 'weekly':
      const daysSinceCreation = Math.floor((now.getTime() - todoDate.getTime()) / (1000 * 60 * 60 * 24));
      const currentDay = now.getDay();
      return currentDay === settings.weeklyResetDay && daysSinceCreation >= 7;
      
    case 'monthly':
      return now.getDate() === settings.monthlyResetDay && 
             (now.getMonth() !== todoDate.getMonth() || 
              now.getFullYear() !== todoDate.getFullYear());
      
    default:
      return false;
  }
}

export function calculateProgress(todos: Todo[], settings: Settings): TodoProgress {
  // Reset todos if needed
  const updatedTodos = todos.map(todo => {
    if (shouldResetTodo(todo, settings)) {
      return {
        ...todo,
        batches: todo.batches.map(batch => ({ ...batch, completed: false })),
        remaining: todo.total,
        createdAt: new Date()
      };
    }
    return todo;
  });

  return {
    daily: calculateCategoryProgress(updatedTodos, 'daily'),
    weekly: calculateCategoryProgress(updatedTodos, 'weekly'),
    monthly: calculateCategoryProgress(updatedTodos, 'monthly'),
    overall: calculateCategoryProgress(updatedTodos, 'daily') * 0.5 +
            calculateCategoryProgress(updatedTodos, 'weekly') * 0.3 +
            calculateCategoryProgress(updatedTodos, 'monthly') * 0.2
  };
}