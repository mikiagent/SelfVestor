import React from 'react';
import { TodoList } from './TodoList';
import { Todo, TodoCategory } from '../types/todo';
import { ResetTimer } from './ResetTimer';
import { useSettings } from '../hooks/useSettings';

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
  const { settings } = useSettings();

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <ResetTimer category={category} settings={settings} />
      </div>
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