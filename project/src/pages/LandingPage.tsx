import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, LineChart, Target, Shield } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <TrendingUp className="w-16 h-16 text-blue-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SelfVestor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Invest in yourself. Track your progress. Achieve your goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </header>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <LineChart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your daily, weekly, and monthly goals with intuitive progress tracking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Set Goals</h3>
              <p className="text-gray-600">
                Create and manage personalized goals with flexible time frames.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Data</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}