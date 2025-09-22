'use client';

import { Camera, CheckCircle2, Circle, Lightbulb, Volume2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TestCalibration() {
  const [checks, setChecks] = useState({ lighting: true, position: false, audio: true });
  const steps = ['Calibration', 'Countdown', 'Recording', 'Review'];
  const activeStep = 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Pre‑test Setup</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${i <= activeStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
              <span className={`hidden sm:block ${i === activeStep ? 'text-gray-900 font-medium' : ''}`}>{s}</span>
              {i < steps.length - 1 && <span className="mx-1 text-gray-300">/</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Camera preview mock */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 h-64 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Camera className="w-10 h-10" />
          </div>
          {/* Pose overlay guide */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 256">
            <rect x="50" y="20" width="300" height="216" rx="12" className="fill-transparent stroke-blue-300" strokeDasharray="6 6" />
            <circle cx="200" cy="80" r="18" className="fill-transparent stroke-emerald-400" />
            <line x1="200" y1="98" x2="200" y2="160" className="stroke-emerald-400" />
            <line x1="160" y1="130" x2="240" y2="130" className="stroke-emerald-400" />
            <line x1="200" y1="160" x2="170" y2="200" className="stroke-emerald-400" />
            <line x1="200" y1="160" x2="230" y2="200" className="stroke-emerald-400" />
          </svg>
        </div>

        {/* Checklist */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
              <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Lighting</p>
                <p className="text-sm text-gray-600">Face the light source. Avoid strong backlight.</p>
              </div>
              {checks.lighting ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
              <Circle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Position</p>
                <p className="text-sm text-gray-600">Stand inside the frame and keep full body visible.</p>
              </div>
              {checks.position ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
              <Volume2 className="w-5 h-5 text-rose-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Audio</p>
                <p className="text-sm text-gray-600">Turn volume up for voice coaching cues.</p>
              </div>
              {checks.audio ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
            </div>
          </div>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">Ready to Start</button>
        </div>
      </div>
    </div>
  );
}




