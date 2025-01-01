import React from 'react';
import { AddTodoForm } from '../components/AddTodoForm';
import { DateDisplay } from '../components/DateDisplay';
import { ProgressSection } from '../components/ProgressSection';
import { CategorySection } from '../components/CategorySection';
import { GoalsHeader } from '../components/GoalsHeader';
import { useTodos } from '../hooks/useTodos';
import { useBudget } from '../hooks/useBudget';

export function GoalsPage() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const { budgetSummary } = useBudget();

  return (
    <div className="space-y-6">
      <DateDisplay />
      <GoalsHeader 
        todos={todos}
        monthlyBudget={budgetSummary.spendingBudget}
      />
      <ProgressSection progress={calculateProgress(todos)} />
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add a Goal</h2>
        <AddTodoForm onAdd={addTodo} />
      </div>

      <div className="space-y-8">
        <CategorySection
          title="Daily Goals"
          category="daily"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
        <CategorySection
          title="Weekly Goals"
          category="weekly"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
        <CategorySection
          title="Monthly Goals"
          category="monthly"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}