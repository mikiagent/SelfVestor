import { Todo, TodoProgress } from '../types/todo';
import { Settings } from '../types/settings';

// Category weights for overall progress
const CATEGORY_WEIGHTS = {
  daily: 0.7,   // 70% weight
  weekly: 0.2,  // 20% weight
  monthly: 0.1  // 10% weight
} as const;

// Calculate progress for a specific category
function calculateCategoryProgress(todos: Todo[], category: 'daily' | 'weekly' | 'monthly'): number {
  const categoryTodos = todos.filter(todo => todo.category === category);
  if (categoryTodos.length === 0) return 0;

  // Calculate progress for each todo based on completed batches
  const todoProgresses = categoryTodos.map(todo => {
    const completedBatches = todo.batches.filter(batch => batch.completed);
    const completedCount = completedBatches.reduce((sum, batch) => sum + batch.count, 0);
    return completedCount / todo.total;
  });

  // Average progress across all todos in the category
  return (todoProgresses.reduce((sum, progress) => sum + progress, 0) / todoProgresses.length) * 100;
}

// Calculate prorated requirements
function getRequiredProgress(settings: Settings): { weekly: number; monthly: number } {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  // Calculate days since last weekly reset
  let daysSinceWeeklyReset = now.getDay() - settings.weeklyResetDay;
  if (daysSinceWeeklyReset < 0) daysSinceWeeklyReset += 7;
  
  // Calculate days since last monthly reset
  let daysSinceMonthlyReset = now.getDate() - settings.monthlyResetDay;
  if (daysSinceMonthlyReset < 0) daysSinceMonthlyReset += daysInMonth;
  
  return {
    weekly: Math.min((daysSinceWeeklyReset + 1) / 7, 1) * 100,
    monthly: Math.min((daysSinceMonthlyReset + 1) / daysInMonth, 1) * 100
  };
}

export function calculateProgress(todos: Todo[], settings: Settings): TodoProgress {
  // Calculate raw progress for each category
  const dailyProgress = calculateCategoryProgress(todos, 'daily');
  const weeklyProgress = calculateCategoryProgress(todos, 'weekly');
  const monthlyProgress = calculateCategoryProgress(todos, 'monthly');

  // Get required progress based on current day
  const { weekly: weeklyRequired, monthly: monthlyRequired } = getRequiredProgress(settings);

  // Check if meeting prorated requirements
  const weeklyAdjusted = Math.min(weeklyProgress / weeklyRequired * 100, 100);
  const monthlyAdjusted = Math.min(monthlyProgress / monthlyRequired * 100, 100);

  // Calculate overall progress using weighted contributions
  const overall = Math.min(
    100, // Cap at 100%
    (CATEGORY_WEIGHTS.daily * dailyProgress) +
    (CATEGORY_WEIGHTS.weekly * weeklyAdjusted) +
    (CATEGORY_WEIGHTS.monthly * monthlyAdjusted)
  );

  return {
    daily: dailyProgress,
    weekly: weeklyProgress,
    monthly: monthlyProgress,
    overall
  };
}