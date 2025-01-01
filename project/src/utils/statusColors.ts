import { Todo } from '../types/todo';

export function getStatusColor(todo: Todo): string {
  const now = new Date();
  const createdDate = new Date(todo.createdAt);
  const hoursSinceCreation = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
  const progress = ((todo.total - todo.remaining) / todo.total) * 100;

  if (progress === 100) {
    return 'bg-green-50 border-green-200';
  }
  
  if (progress > 0) {
    return 'bg-yellow-50 border-yellow-200';
  }
  
  if (hoursSinceCreation >= 24) {
    return 'bg-gray-50 border-gray-200';
  }
  
  return 'bg-white border-gray-200';
}