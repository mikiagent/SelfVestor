import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, PiggyBank } from 'lucide-react';
import { Header } from './Header';
import { SettingsDropdown } from './Settings/SettingsDropdown';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Header />
          
          <div className="flex items-center gap-6">
            <NavLink
              to="/dashboard/goals"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              <Target className="w-4 h-4" />
              Goals
            </NavLink>
            
            <NavLink
              to="/dashboard/budget"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              <PiggyBank className="w-4 h-4" />
              Budget
            </NavLink>

            <SettingsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}