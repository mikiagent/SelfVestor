import React, { useState } from 'react';
import { TodoCategory, Priority } from '../types/todo';
import { getPriorityDots, getPriorityLabel } from '../utils/priorityUtils';
import { BatchControls } from './BatchControls';

interface AddTodoFormProps {
  onAdd: (title: string, category: TodoCategory, total: number, batchSize: number, priority: Priority) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TodoCategory>('daily');
  const [total, setTotal] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [priority, setPriority] = useState<Priority>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && total > 0 && batchSize > 0) {
      onAdd(title.trim(), category, total, batchSize, priority);
      setTitle('');
      setTotal(1);
      setBatchSize(1);
      setPriority(3);
    }
  };

  const handleTotalChange = (newTotal: number) => {
    const validTotal = Math.max(1, newTotal);
    setTotal(validTotal);
    setBatchSize(prev => Math.min(prev, validTotal));
  };

  const handleBatchSizeChange = (newSize: number) => {
    setBatchSize(Math.max(1, Math.min(total, newSize)));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Goal Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter goal title"
          required
        />
      </div>

      <BatchControls
        total={total}
        batchSize={batchSize}
        onTotalChange={handleTotalChange}
        onBatchSizeChange={handleBatchSizeChange}
      />

      <div className="grid grid-cols-2 gap-6">
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
        Add Goal
      </button>
    </form>
  );
}