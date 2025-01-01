import { TodoProgress } from '../types/todo';

export function getProgressMessage(progress: TodoProgress): string {
  const { overall, daily, weekly, monthly } = progress;

  // Perfect progress
  if (overall >= 100) {
    return "You've crushed all your goals! Outstanding work! 🎉";
  }

  // High overall progress
  if (overall >= 80) {
    return "Almost there! Keep up the amazing work! 💪";
  }

  // Good progress but missing some categories
  if (overall >= 60) {
    if (daily < 70) return "Good progress, but don't forget your daily goals!";
    if (weekly < 70) return "Great work! Focus on those weekly goals next!";
    if (monthly < 70) return "Excellent pace! Let's tackle those monthly goals!";
    return "Solid progress across the board! Keep going! 🚀";
  }

  // Moderate progress
  if (overall >= 40) {
    if (daily >= 80) return "Daily goals looking great! Now let's boost those longer-term goals!";
    if (weekly >= 80) return "Weekly goals on track! Balance them with daily tasks!";
    if (monthly >= 80) return "Monthly goals are strong! Let's focus on the shorter-term now!";
    return "You're making progress! Keep building momentum! 📈";
  }

  // Low progress but some activity
  if (overall > 0) {
    return "You've made a start! Small steps lead to big achievements! 🌱";
  }

  // No progress
  return "Ready to begin? Start with your daily goals! 🎯";
}