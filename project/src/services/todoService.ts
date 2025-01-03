import { Todo } from '../types/todo';
import { serializeDate, deserializeDate } from './dateSerializer';

export function serializeTodo(todo: Todo): any {
  return {
    ...todo,
    createdAt: serializeDate(todo.createdAt)
  };
}

export function deserializeTodo(data: any): Todo {
  return {
    ...data,
    createdAt: deserializeDate(data.createdAt)
  };
}

export function serializeTodos(todos: Todo[]): any[] {
  return todos.map(serializeTodo);
}

export function deserializeTodos(data: any[]): Todo[] {
  return data.map(deserializeTodo);
}