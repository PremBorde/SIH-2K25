'use client';

import { Award, Calendar, Activity } from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Profile Stats</p>
          <div className="mt-2 text-2xl font-semibold text-gray-900">Athlete Level: A</div>
          <div className="mt-3 text-sm text-gray-700">Tests: 42 • PBs: 8</div>
        </div>
        <div className="lg:col-span-2 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2"><Calendar className="w-5 h-5 text-blue-600" /><p className="font-medium text-gray-900">Recent Tests</p></div>
          <ul className="text-sm text-gray-700 space-y-1">
            {['Push‑up • 48 reps', 'Vertical • 63 cm', 'Agility • 6.8 s'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </div>
        <div className="lg:col-span-1 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2"><Award className="w-5 h-5 text-yellow-500" /><p className="font-medium text-gray-900">Personal Bests</p></div>
          <ul className="text-sm text-gray-700 space-y-1">
            {['Push‑up: 52', 'Vertical: 65 cm', 'Sprint: 4.74 s'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {[1,2,3].map(n => (
          <div key={n} className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2"><Activity className="w-5 h-5 text-emerald-600" /><p className="font-medium text-gray-900">Training Recommendation {n}</p></div>
            <p className="text-sm text-gray-600">Focus on technique quality and tempo. Add mobility drills for hips and ankles.</p>
          </div>
        ))}
      </div>
    </div>
  );
}




