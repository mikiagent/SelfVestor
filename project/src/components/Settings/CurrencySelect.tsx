import React from 'react';
import { CURRENCIES } from '../../utils/currencyUtils';

interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
}

export function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Currency
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}