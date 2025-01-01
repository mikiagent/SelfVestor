import React from 'react';
import { TodoList } from './TodoList';
import { Todo, TodoCategory } from '../types/todo';

interface CategorySectionProps {
  title: string;
  category: TodoCategory;
  todos: Todo[];
  onUpdateTodo: (id: string, batchId: string) => void;
  onUndoBatch: (id: string, batchId: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, updates: Partial<Todo>) => void;
}

export function CategorySection({ 
  title, 
  category, 
  todos, 
  onUpdateTodo,
  onUndoBatch,
  onDeleteTodo,
  onEditTodo
}: CategorySectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <TodoList
        todos={todos}
        category={category}
        onUpdateTodo={onUpdateTodo}
        onUndoBatch={onUndoBatch}
        onDeleteTodo={onDeleteTodo}
        onEditTodo={onEditTodo}
      />
    </section>
  );
}