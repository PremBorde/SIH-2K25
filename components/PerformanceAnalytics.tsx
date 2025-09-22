'use client';

import { TrendingUp, Trophy, Activity } from 'lucide-react';

export default function PerformanceAnalytics() {
  const metrics = [
    { title: 'Total Tests', value: 42, delta: '+4 this week' },
    { title: 'Best Vertical', value: '63 cm', delta: '+3 cm' },
    { title: 'Avg Form', value: '84%', delta: '+2%' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3></div>
        <span className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">This week vs last</span>
      </div>

      {/* Metric cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.title} className="rounded-lg border border-gray-200 p-4 bg-white">
            <p className="text-sm text-gray-600">{m.title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{m.value}</p>
            <p className="text-xs text-emerald-700 mt-1">{m.delta}</p>
          </div>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">Progress Chart (mock)</div>
        <div className="h-48 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">Comparison Chart (mock)</div>
      </div>
    </div>
  );
}




