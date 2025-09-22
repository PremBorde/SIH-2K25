'use client';

import { Mic, Activity, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VoiceCoach() {
  const [rep, setRep] = useState(12);
  const [form, setForm] = useState(82);
  const [tip, setTip] = useState('Great pace! Maintain full range at the bottom.');

  useEffect(() => {
    const id = setInterval(() => {
      setRep(r => r + 1);
      setForm(f => Math.max(60, Math.min(99, f + (Math.random() > 0.5 ? 1 : -1))));
      setTip(['Keep core tight.', 'Elbows tucked.', 'Full lockout at top.', 'Smooth tempo.'][Math.floor(Math.random()*4)]);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mic className="w-6 h-6 text-rose-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Voice Coach</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Reps: {rep}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Form: {form}%</span>
          </div>
        </div>
      </div>

      {/* Audio wave animation (mock) */}
      <div className="mt-6 h-24 bg-gray-50 rounded-lg flex items-center gap-1 px-3">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="w-1.5 rounded-full bg-blue-200" style={{ height: `${20 + Math.abs(Math.sin((Date.now()/200 + i) % Math.PI))*40}px` }} />
        ))}
      </div>

      {/* Tip */}
      <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-white">
        <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Coach:</span> {tip}</p>
      </div>
    </div>
  );
}




