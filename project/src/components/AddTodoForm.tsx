import React, { useState } from 'react';
import { TodoCategory, Priority } from '../types/todo';
import { getPriorityDots, getPriorityLabel } from '../utils/priorityUtils';
import { Minus, Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAdd: (title: string, category: TodoCategory, total: number, priority: Priority) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TodoCategory>('daily');
  const [total, setTotal] = useState<number>(1);
  const [priority, setPriority] = useState<Priority>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && total > 0) {
      onAdd(title.trim(), category, total, priority);
      setTitle('');
      setTotal(1);
      setPriority(3);
    }
  };

  const handleIncrement = () => setTotal(prev => prev + 1);
  const handleDecrement = () => setTotal(prev => Math.max(1, prev - 1));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <label className="block text-sm font-medium text-gray-700">#</label>
        <div className="flex items-center border rounded-md">
          <button
            type="button"
            onClick={handleDecrement}
            className="p-1 hover:bg-gray-100 rounded-l"
          >
            <Minus size={18} className="text-gray-600" />
          </button>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-x py-1"
            min="1"
            aria-label="Number of tasks"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="p-1 hover:bg-gray-100 rounded-r"
          >
            <Plus size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as Priority)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>
                {getPriorityLabel(level as Priority)} {getPriorityDots(level as Priority)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Window
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TodoCategory)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Task
      </button>
    </form>
  );
}