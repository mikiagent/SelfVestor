import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <TrendingUp className="w-8 h-8 text-blue-600" />
        <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SelfVestor
        </h1>
        <p className="text-xs text-gray-500 -mt-1">Invest in Your Progress</p>
      </div>
    </div>
  );
}