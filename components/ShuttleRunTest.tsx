'use client';

export default function ShuttleRunTest() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏃‍♂️</span>
          <h3 className="text-lg font-semibold text-gray-900">Shuttle Run</h3>
        </div>
        <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">Duration: 3 minutes • Difficulty: High</div>
      </div>
      <p className="text-sm text-gray-600">Measure agility and change‑of‑direction speed by sprinting between cones with quick turns.</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-5">
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Equipment</div>
          <p className="text-sm text-gray-600">Cones (5‑10‑5), flat surface, camera</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Form Tips</div>
          <p className="text-sm text-gray-600">Low center of gravity, plant foot outside, accelerate out of turns.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Outcomes</div>
          <p className="text-sm text-gray-600">Total time, split times, turn efficiency.</p>
        </div>
      </div>
    </div>
  );
}




