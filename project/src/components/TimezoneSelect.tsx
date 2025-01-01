import React from 'react';
import { getAvailableTimezones, getTimezoneByValue } from '../utils/timezoneUtils';

interface TimezoneSelectProps {
  value: string;
  onChange: (timezone: string) => void;
}

export function TimezoneSelect({ value, onChange }: TimezoneSelectProps) {
  const timezones = getAvailableTimezones();
  const currentTimezone = getTimezoneByValue(value);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Timezone
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {timezones.map((timezone) => (
          <option key={timezone.value} value={timezone.value}>
            {timezone.name}
          </option>
        ))}
      </select>
      <p className="mt-1 text-sm text-gray-500">
        Current timezone: {currentTimezone?.name || 'Unknown'}
      </p>
    </div>
  );
}