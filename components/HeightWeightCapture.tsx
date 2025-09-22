'use client';

import { Ruler, Scale, Info } from 'lucide-react';
import { useState } from 'react';

export default function HeightWeightCapture() {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Height & Weight</h3>
      <p className="text-sm text-gray-600">Follow the guide to record accurate measurements. Use a wall for height and a calibrated digital scale for weight.</p>

      <div className="grid sm:grid-cols-2 gap-6 mt-5">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3"><Ruler className="w-5 h-5 text-blue-600" /><span className="font-medium text-gray-900">Height (cm)</span></div>
          <input value={height} onChange={e=>setHeight(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <p className="mt-2 text-xs text-gray-500">Barefoot, heels against wall, head level.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3"><Scale className="w-5 h-5 text-emerald-600" /><span className="font-medium text-gray-900">Weight (kg)</span></div>
          <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <p className="mt-2 text-xs text-gray-500">Weigh in morning, minimal clothing.</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm text-gray-600 flex items-center gap-2"><Info className="w-4 h-4" /> Data is stored locally for demo.</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Save</button>
      </div>
    </div>
  );
}




