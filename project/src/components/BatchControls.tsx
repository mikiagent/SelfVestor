import React from 'react';
import { Minus, Plus, Layers } from 'lucide-react';

interface BatchControlsProps {
  total: number;
  batchSize: number;
  onTotalChange: (value: number) => void;
  onBatchSizeChange: (value: number) => void;
}

export function BatchControls({ 
  total, 
  batchSize, 
  onTotalChange, 
  onBatchSizeChange 
}: BatchControlsProps) {
  const batchCount = Math.ceil(total / batchSize);
  const lastBatchSize = total % batchSize || batchSize;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Total Count
        </label>
        <div className="relative">
          <div className="flex items-center border rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => onTotalChange(total - 1)}
              disabled={total <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md border-r"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={total}
              onChange={(e) => onTotalChange(parseInt(e.target.value) || 1)}
              className="w-20 text-center focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
            <button
              type="button"
              onClick={() => onTotalChange(total + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-md border-l"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Total items to complete</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Batch Size
        </label>
        <div className="relative">
          <div className="flex items-center border rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => onBatchSizeChange(batchSize - 1)}
              disabled={batchSize <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md border-r"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={batchSize}
              onChange={(e) => onBatchSizeChange(parseInt(e.target.value) || 1)}
              className="w-20 text-center focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max={total}
            />
            <button
              type="button"
              onClick={() => onBatchSizeChange(batchSize + 1)}
              disabled={batchSize >= total}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-r-md border-l"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Layers className="w-4 h-4" />
              <span>
                {batchCount} batch{batchCount !== 1 ? 'es' : ''}
                {batchCount > 1 && lastBatchSize !== batchSize && 
                  ` (last batch: ${lastBatchSize})`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}