'use client';

import { Target, Users, Flag } from 'lucide-react';

export default function ChallengeCenter() {
  const challenges = [
    { title: '30‑Rep Push‑up Sprint', progress: 18, goal: 30 },
    { title: 'Agility Ladder Week', progress: 4, goal: 5 },
    { title: 'Endurance 5k', progress: 3, goal: 5 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-semibold text-gray-900">Challenge Center</h3></div>
      <div className="grid lg:grid-cols-2 gap-4">
        {challenges.map(c => (
          <div key={c.title} className="rounded-lg border border-gray-200 p-4 bg-white">
            <p className="font-medium text-gray-900">{c.title}</p>
            <p className="text-xs text-gray-600">Progress: {c.progress}/{c.goal}</p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-emerald-600 rounded-full" style={{ width: `${(c.progress/c.goal)*100}%` }} />
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-2 mb-2"><Users className="w-5 h-5 text-purple-600" /><p className="font-medium text-gray-900">Team Leaderboard</p></div>
          <div className="space-y-2 text-sm">
            {[['Alpha', 120], ['Bravo', 96], ['Gamma', 88]].map(([team, pts]) => (
              <div key={team as string} className="flex items-center justify-between">
                <span className="text-gray-700">{team as string}</span>
                <span className="font-medium text-gray-900">{pts as number} pts</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-2 mb-2"><Flag className="w-5 h-5 text-rose-600" /><p className="font-medium text-gray-900">Set a Goal</p></div>
          <p className="text-sm text-gray-600">Run 3 times this week, improve vertical by 2 cm, complete 2 skill sessions.</p>
          <button className="mt-3 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">Create Goal</button>
        </div>
      </div>
    </div>
  );
}




