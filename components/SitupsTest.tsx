'use client';

import { Crunch, Timer, Info, Dumbbell } from 'lucide-react';

export default function SitupsTest() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧍‍♂️</span>
          <h3 className="text-lg font-semibold text-gray-900">Sit‑ups Test</h3>
        </div>
        <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">Duration: 1 minute • Difficulty: Medium</div>
      </div>
      <p className="text-sm text-gray-600">Measure core endurance by performing as many sit‑ups as possible in one minute.</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-5">
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Equipment</div>
          <p className="text-sm text-gray-600">Mat, timer, camera</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Form Tips</div>
          <p className="text-sm text-gray-600">Heels on floor, elbows to knees, controlled tempo.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Outcomes</div>
          <p className="text-sm text-gray-600">Total reps, average tempo, form score.</p>
        </div>
      </div>
    </div>
  );
}




