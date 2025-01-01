import { Priority } from '../types/todo';

export const PRIORITY_MULTIPLIERS: Record<Priority, number> = {
  1: 1,
  2: 1.25,
  3: 1.5,
  4: 1.75,
  5: 2
};

export function getPriorityDots(priority: Priority): string {
  return '🔴'.repeat(priority);
}

export function getPriorityLabel(priority: Priority): string {
  const labels: Record<Priority, string> = {
    1: 'Low',
    2: 'Medium-Low',
    3: 'Medium',
    4: 'Medium-High',
    5: 'High'
  };
  return labels[priority];
}