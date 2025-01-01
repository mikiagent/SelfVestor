import { Todo } from '../types/todo';

export function migrateTodo(todo: Partial<Todo>): Todo {
  // If the todo already has batches, return as is
  if (todo.batches) {
    return todo as Todo;
  }

  // Create batches for existing todos
  const total = todo.total || 1;
  const batchSize = total; // Default to one batch for existing todos
  const batches = [{
    id: `${Date.now()}-0`,
    count: total,
    completed: total === (todo.remaining || 0)
  }];

  return {
    id: todo.id || Date.now().toString(),
    title: todo.title || '',
    category: todo.category || 'daily',
    priority: todo.priority || 3,
    batches,
    batchSize,
    total,
    remaining: todo.remaining || total,
    createdAt: todo.createdAt ? new Date(todo.createdAt) : new Date(),
  };
}

export function migrateData(data: any[]): Todo[] {
  return data.map(migrateTodo);
}