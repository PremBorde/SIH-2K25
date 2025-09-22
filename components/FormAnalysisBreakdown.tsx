'use client';

import { Gauge } from 'lucide-react';

export default function FormAnalysisBreakdown() {
  const joints = [
    { name: 'Knee', score: 88 },
    { name: 'Hip', score: 81 },
    { name: 'Shoulder', score: 76 },
    { name: 'Spine', score: 84 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4"><Gauge className="w-5 h-5 text-emerald-600" /><h3 className="text-lg font-semibold text-gray-900">Form Analysis</h3></div>
      <p className="text-sm text-gray-600">Form score breakdown by joint and overall movement quality heatmap.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {joints.map(j => (
          <div key={j.name} className="rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-600">{j.name}</p>
            <p className="text-2xl font-semibold text-gray-900">{j.score}%</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${j.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 h-48 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">Movement Heatmap (mock)</div>
    </div>
  );
}




