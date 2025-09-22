'use client';

import { Trophy, Award, Sparkles } from 'lucide-react';

export default function AchievementBadges() {
  const badges = [
    { name: 'Consistency', desc: '7‑day streak', icon: '🔥', progress: 70 },
    { name: 'Power Up', desc: 'Vertical +5 cm', icon: '⚡', progress: 45 },
    { name: 'Endurance Pro', desc: '5 km under 25m', icon: '🏅', progress: 20 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-yellow-500" /><h3 className="text-lg font-semibold text-gray-900">Achievement Badges</h3></div>
      <div className="grid sm:grid-cols-3 gap-4">
        {badges.map(b => (
          <div key={b.name} className="rounded-lg border border-gray-200 p-4 bg-white">
            <div className="text-3xl">{b.icon}</div>
            <p className="font-medium text-gray-900 mt-2">{b.name}</p>
            <p className="text-sm text-gray-600">{b.desc}</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${b.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm flex items-center gap-2">
        <Sparkles className="w-4 h-4" /> New badge available: Complete 3 tests this week!
      </div>
    </div>
  );
}




