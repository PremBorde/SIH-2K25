'use client';

import { Play, Pause, Flag, Repeat } from 'lucide-react';
import { useState } from 'react';

export default function TestReplay() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(36);
  const highlights = [4, 9, 15, 22, 30, 35, 41, 48, 52, 58];
  const best = 30; // seconds
  const worst = 48;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Post‑test Review</h3>
        <button className="text-sm text-blue-700 hover:underline flex items-center gap-2" onClick={() => setTime(0)}>
          <Repeat className="w-4 h-4" /> Restart
        </button>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-6">
        {/* Video mock */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 h-56 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">Video Preview</div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <button onClick={() => setPlaying(p => !p)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {playing ? 'Pause' : 'Play'}
            </button>
            <span className="text-xs text-gray-600">{time}s</span>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Rep highlights</p>
          <div className="h-16 rounded-lg border border-gray-200 bg-white flex items-center relative px-2">
            <div className="absolute inset-x-2 h-1 bg-gray-100 rounded-full" />
            {highlights.map((t, i) => (
              <div key={i} className="w-1 h-4 bg-blue-500 rounded-full" style={{ marginLeft: `${t}%` }} />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg text-sm">
              <Flag className="w-4 h-4" /> Best rep at {best}s
            </div>
            <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-lg text-sm">
              <Flag className="w-4 h-4" /> Worst rep at {worst}s
            </div>
          </div>
          {/* Side‑by‑side placeholder */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-28 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">Best Rep</div>
            <div className="h-28 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">Worst Rep</div>
          </div>
        </div>
      </div>
    </div>
  );
}




