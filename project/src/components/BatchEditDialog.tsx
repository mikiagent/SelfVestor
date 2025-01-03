import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Todo } from '../types/todo';
import { validateBatchInput } from '../utils/batchValidation';

interface BatchEditDialogProps {
  todo: Todo;
  onSave: (updates: { total: number; batchSize: number }) => void;
  onClose: () => void;
}

export function BatchEditDialog({ todo, onSave, onClose }: BatchEditDialogProps) {
  const [total, setTotal] = useState<string>(todo.total.toString());
  const [batchSize, setBatchSize] = useState<string>(todo.batchSize.toString());
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalNum = parseInt(total);
    const batchSizeNum = parseInt(batchSize);

    const validationError = validateBatchInput(totalNum, batchSizeNum);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave({ total: totalNum, batchSize: batchSizeNum });
  };

  const handleTotalChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setTotal(value);
      const totalNum = parseInt(value) || 0;
      const batchSizeNum = parseInt(batchSize) || 0;
      if (batchSizeNum > totalNum) {
        setBatchSize(value);
      }
    }
  };

  const handleBatchSizeChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      const totalNum = parseInt(total) || 0;
      const batchSizeNum = parseInt(value) || 0;
      if (batchSizeNum <= totalNum) {
        setBatchSize(value);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Batch Settings</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Count
            </label>
            <input
              type="text"
              value={total}
              onChange={(e) => handleTotalChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="1"
              pattern="\d+"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Size
            </label>
            <input
              type="text"
              value={batchSize}
              onChange={(e) => handleBatchSizeChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="1"
              pattern="\d+"
            />
            {total && batchSize && (
              <p className="mt-1 text-sm text-gray-500">
                Will create {Math.ceil(parseInt(total) / parseInt(batchSize))} batches
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}