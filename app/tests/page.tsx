'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Test } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<string>('');
  const isOnline = health.includes('Online');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [tRes, hRes] = await Promise.all([
          api.fetchTests(),
          fetch('/api/health', { cache: 'no-store' }).then(r => r.json()).catch(() => null)
        ]);
        if (mounted) {
          setTests(tRes);
          if (hRes && hRes.status === 'healthy') setHealth('AI backend: Online');
          else setHealth('AI backend: Offline');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const launchDemo = async () => {
    try {
      await fetch('/api/launch-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_type: 'pushup', mode: 'full' })
      });
    } catch (e) {
      console.warn('Demo launch failed');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-emerald-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(650px_200px_at_10%_-20%,rgba(59,130,246,0.12),transparent),radial-gradient(600px_200px_at_90%_-10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full ${isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{health}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Real‑time AI</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Performance Lab</h1>
            <p className="text-gray-600 mt-1">Run athletic tests with live pose, reps, cheat detection and instant scorecards.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/tests/pushup" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start Push‑up</Link>
            <button onClick={launchDemo} disabled={!isOnline} className={`inline-flex items-center px-4 py-2 rounded-lg border font-medium ${isOnline ? 'border-gray-300 text-gray-700 hover:bg-white bg-gray-100' : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'}`}>Launch Desktop Demo</button>
          </div>
        </div>
      </motion.div>

      {/* Tests grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Choose a test</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tests.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -3 }}
              className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{test.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm sm:text-base">{test.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{test.description}</div>
                  <div className="text-xs text-gray-500 mt-3">Duration: {test.duration} • Equipment: {test.equipment.join(', ')}</div>

                  <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <Link href={`/tests/${test.id}`} className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-blue-600 text-white text-xs sm:text-sm font-medium hover:bg-blue-700">
                      Start
                    </Link>
                    <Link href={`/tests/${test.id}`} className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-white">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Assessments */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Assessments</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            { title: 'Pose Detection', desc: 'Real‑time landmarks for analysis' },
            { title: 'Rep Counting', desc: 'Accurate reps and states' },
            { title: 'Form & Cheat Detection', desc: 'Violations, form score, tips' },
            { title: 'Talent Prediction', desc: 'Composite talent score & profile' },
            { title: 'Olympic Readiness', desc: 'Readiness category & path' },
          ].map((a, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl border border-gray-200 p-4 bg-white">
              <div className="font-medium text-gray-900">{a.title}</div>
              <div className="text-sm text-gray-600">{a.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WOW Features */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">WOW Features</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            { title: 'AI Voice Coach', desc: 'Smart voice guidance during tests' },
            { title: 'Desktop Demo Launcher', desc: 'One‑click launch from backend' },
          ].map((w, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="rounded-xl border border-gray-200 p-4 bg-white">
              <div className="font-medium text-gray-900">{w.title}</div>
              <div className="text-sm text-gray-600">{w.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}