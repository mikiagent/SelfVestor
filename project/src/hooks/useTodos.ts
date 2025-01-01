import { useState, useEffect } from 'react';
import { Todo, TodoCategory, Priority, Batch } from '../types/todo';
import { saveTodos, loadTodos } from '../utils/storage';
import { updateCurrentProgress } from '../utils/progressStorage';
import { calculateProgress } from '../utils/progressCalculator';
import { loadSettings } from '../utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const settings = loadSettings();

  useEffect(() => {
    saveTodos(todos);
    const progress = calculateProgress(todos, settings);
    updateCurrentProgress(progress.overall);
  }, [todos, settings]);

  const addTodo = (
    title: string,
    category: TodoCategory,
    total: number,
    batchSize: number,
    priority: Priority
  ) => {
    const batches: Batch[] = Array.from(
      { length: Math.ceil(total / batchSize) },
      (_, i) => ({
        id: `${Date.now()}-${i}`,
        count: Math.min(batchSize, total - i * batchSize),
        completed: false
      })
    );

    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      batches,
      batchSize,
      total,
      remaining: total,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (todoId: string, batchId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: true } : batch
        );
        const completedCount = updatedBatches.reduce((sum, batch) => 
          sum + (batch.completed ? batch.count : 0), 0
        );
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    }));
  };

  const undoBatch = (todoId: string, batchId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: false } : batch
        );
        const completedCount = updatedBatches.reduce((sum, batch) => 
          sum + (batch.completed ? batch.count : 0), 0
        );
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    undoBatch,
    deleteTodo,
    editTodo,
    setTodos
  };
}