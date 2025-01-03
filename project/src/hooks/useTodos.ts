import { useCallback } from 'react';
import { Todo } from '../types/todo';
import { useFirestore } from './useFirestore';
import { serializeTodos, deserializeTodos } from '../services/todoService';

export function useTodos() {
  const { data, updateData } = useFirestore();
  const todos = deserializeTodos(data?.todos || []);

  const persistTodos = useCallback(async (updatedTodos: Todo[]) => {
    try {
      await updateData({ 
        todos: serializeTodos(updatedTodos)
      });
    } catch (error) {
      console.error('Error persisting todos:', error);
    }
  }, [updateData]);

  const addTodo = useCallback(async (
    title: string, 
    category: TodoCategory, 
    total: number,
    batchSize: number,
    priority: Priority
  ) => {
    const batches: Batch[] = [];
    let remaining = total;
    let batchIndex = 0;

    while (remaining > 0) {
      const count = Math.min(remaining, batchSize);
      batches.push({
        id: `${Date.now()}-${batchIndex}`,
        count,
        completed: false
      });
      remaining -= count;
      batchIndex++;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      batches,
      batchSize,
      total,
      remaining: total,
      createdAt: new Date()
    };

    await persistTodos([...todos, newTodo]);
  }, [todos, persistTodos]);

  const updateTodo = useCallback(async (id: string, batchId: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: true } : batch
        );
        const completedCount = updatedBatches
          .filter(b => b.completed)
          .reduce((sum, b) => sum + b.count, 0);
        
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    });

    await persistTodos(updatedTodos);
  }, [todos, persistTodos]);

  const undoBatch = useCallback(async (id: string, batchId: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: false } : batch
        );
        const completedCount = updatedBatches
          .filter(b => b.completed)
          .reduce((sum, b) => sum + b.count, 0);
        
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    });

    await persistTodos(updatedTodos);
  }, [todos, persistTodos]);

  const editTodo = useCallback(async (id: string, updates: Partial<Todo>) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    );
    await persistTodos(updatedTodos);
  }, [todos, persistTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    await persistTodos(updatedTodos);
  }, [todos, persistTodos]);

  return {
    todos,
    addTodo,
    updateTodo,
    undoBatch,
    deleteTodo,
    editTodo
  };
}