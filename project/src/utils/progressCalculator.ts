import { Todo, TodoCategory, TodoProgress } from '../types/todo';
import { PRIORITY_MULTIPLIERS } from './priorityUtils';
import { Settings } from '../types/settings';

export function calculateProgress(todos: Todo[], settings: Settings): TodoProgress {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  
  const weeklyRequirement = Math.min(
    (dayOfWeek < settings.weeklyResetDay ? dayOfWeek + 7 : dayOfWeek) - settings.weeklyResetDay + 1,
    7
  ) / 7;
  
  const monthlyRequirement = Math.min(
    (dayOfMonth < settings.monthlyResetDay ? dayOfMonth + daysInMonth : dayOfMonth) - settings.monthlyResetDay + 1,
    daysInMonth
  ) / daysInMonth;

  const progress = {
    daily: 0,
    weekly: 0,
    monthly: 0,
    overall: 0,
  };

  const categoryTotals: Record<TodoCategory, { weighted: number; total: number }> = {
    daily: { weighted: 0, total: 0 },
    weekly: { weighted: 0, total: 0 },
    monthly: { weighted: 0, total: 0 },
  };

  todos.forEach((todo) => {
    const multiplier = PRIORITY_MULTIPLIERS[todo.priority];
    const completed = todo.total - todo.remaining;
    const weightedCompleted = completed * multiplier;
    const weightedTotal = todo.total * multiplier;
    
    categoryTotals[todo.category].weighted += weightedCompleted;
    categoryTotals[todo.category].total += weightedTotal;
  });

  // Calculate raw progress for each category
  Object.entries(categoryTotals).forEach(([category, { weighted, total }]) => {
    if (total > 0) {
      progress[category as TodoCategory] = (weighted / total) * 100;
    } else {
      // If no tasks in category, set to 100%
      progress[category as TodoCategory] = 100;
    }
  });

  // Adjust weekly and monthly progress based on requirements
  if (progress.weekly > weeklyRequirement * 100) {
    progress.weekly = 100;
  }
  
  if (progress.monthly > monthlyRequirement * 100) {
    progress.monthly = 100;
  }

  // Calculate overall progress
  // If there are no daily tasks, use weekly and monthly progress
  if (categoryTotals.daily.total === 0) {
    progress.overall = (progress.weekly * 0.6 + progress.monthly * 0.4);
  } else {
    // Otherwise use standard weights with daily progress weighted more heavily
    progress.overall = (
      progress.daily * 0.5 +
      progress.weekly * 0.3 +
      progress.monthly * 0.2
    );
  }

  return progress;
}