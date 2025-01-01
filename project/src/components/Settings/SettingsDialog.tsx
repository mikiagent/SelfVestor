import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Settings } from '../../types/settings';
import { TimezoneSelect } from '../TimezoneSelect';
import { CurrencySelect } from './CurrencySelect';
import { useSettings } from '../../hooks/useSettings';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const { settings, saveSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<Settings>(settings);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <TimezoneSelect
            value={localSettings.timezone}
            onChange={(timezone) => setLocalSettings(prev => ({ ...prev, timezone }))}
          />

          <CurrencySelect
            value={localSettings.currency}
            onChange={(currency) => setLocalSettings(prev => ({ ...prev, currency }))}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Reset Day
            </label>
            <select
              value={localSettings.weeklyResetDay}
              onChange={(e) => setLocalSettings(prev => ({
                ...prev,
                weeklyResetDay: Number(e.target.value)
              }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                .map((day, index) => (
                  <option key={day} value={index}>{day}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Reset Day
            </label>
            <select
              value={localSettings.monthlyResetDay}
              onChange={(e) => setLocalSettings(prev => ({
                ...prev,
                monthlyResetDay: Number(e.target.value)
              }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}