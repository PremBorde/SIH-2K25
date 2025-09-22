'use client';

import { Download, Search } from 'lucide-react';
import { useState } from 'react';

export default function TestHistory() {
  const [query, setQuery] = useState('');
  const rows = [
    { date: '2024-01-14', test: 'Push‑up', result: '48 reps', score: 86 },
    { date: '2024-01-12', test: 'Vertical', result: '63 cm', score: 88 },
    { date: '2024-01-10', test: 'Agility', result: '6.8 s', score: 84 }
  ];

  const filtered = rows.filter(r => r.test.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tests..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-2">Date</th>
              <th className="py-2">Test</th>
              <th className="py-2">Result</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 text-gray-700">{r.date}</td>
                <td className="py-2 text-gray-900 font-medium">{r.test}</td>
                <td className="py-2 text-gray-700">{r.result}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-2 bg-emerald-500" style={{ width: `${r.score}%` }} /></div>
                    <span className="text-gray-900 font-medium">{r.score}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




