'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Camera, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Info
} from 'lucide-react';
import { Test, api } from '@/lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

type TestStage = 'setup' | 'countdown' | 'recording' | 'results';

export default function TestDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState<TestStage>('setup');
  const [countdown, setCountdown] = useState(5);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [testResult, setTestResult] = useState<{score: number; unit: string; percentile: number} | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const exerciseType = useMemo(() => {
    const key = (params.name as string) || '';
    const map: Record<string, string> = { 'pushup': 'pushup', 'squat': 'squat', 'plank': 'plank' };
    return map[key] || 'pushup';
  }, [params.name]);

  useEffect(() => {
    const loadTest = async () => {
      if (params.name) {
        try {
          const testData = await api.fetchTest(params.name as string);
          setTest(testData);
        } catch (error) {
          console.error('Error loading test:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadTest();
  }, [params.name]);

  useEffect(() => {
    if (currentStage === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentStage === 'countdown' && countdown === 0) {
      setCurrentStage('recording');
      setIsRecording(true);
    }
  }, [countdown, currentStage]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isRecording]);

  const startTest = async () => {
    setCurrentStage('countdown');
    setCountdown(5);
    setBusy(true);
    try {
      const res = await fetch('/api/start-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_type: exerciseType })
      });
      const data = await res.json();
      if (data?.success) setSessionId(data.session_id || null);
    } catch {}
    finally { setBusy(false); }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setBusy(true);
    try {
      const res = await fetch('/api/scorecard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_type: exerciseType, session_id: sessionId })
      });
      const data = await res.json();
      if (data?.success) {
        setTestResult({
          score: Number(data.score ?? 0),
          unit: ['sprint', 'agility', 'endurance'].includes(String(params.name)) ? 'seconds' : 'reps',
          percentile: Number(data.percentile ?? 0)
        });
        setCurrentStage('results');
        return;
      }
      throw new Error('Backend scorecard failed');
    } catch (e) {
      const mockResults = {
        'pushup': { score: Math.floor(Math.random() * 30) + 25, unit: 'reps', percentile: Math.floor(Math.random() * 30) + 70 },
        'squat': { score: Math.floor(Math.random() * 40) + 30, unit: 'reps', percentile: Math.floor(Math.random() * 25) + 75 },
        'vertical-jump': { score: Math.floor(Math.random() * 10) + 20, unit: 'inches', percentile: Math.floor(Math.random() * 20) + 80 },
        'sprint': { score: Number((Math.random() * 2 + 4).toFixed(2)), unit: 'seconds', percentile: Math.floor(Math.random() * 15) + 85 },
        'agility': { score: Number((Math.random() * 2 + 5).toFixed(2)), unit: 'seconds', percentile: Math.floor(Math.random() * 20) + 75 },
        'endurance': { score: Number((Math.random() * 2 + 6).toFixed(2)), unit: 'min/mile', percentile: Math.floor(Math.random() * 25) + 70 }
      } as const;
      const result = (mockResults as any)[params.name as string] || { score: 0, unit: '', percentile: 0 };
      setTestResult(result);
      setCurrentStage('results');
    } finally { setBusy(false); }
  };

  const retakeTest = () => {
    setCurrentStage('setup');
    setRecordingTime(0);
    setTestResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Test not found</h2>
        <p className="text-gray-600 mt-2">The test you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/tests')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Back to Tests</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.push('/tests')} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3"><span className="text-4xl">{test.icon}</span><span>{test.name}</span></h1>
          <p className="text-gray-600 mt-1">{test.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-900 relative flex items-center justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                {currentStage === 'setup' && (
                  <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-white p-8">
                    <Camera size={64} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Ready to start your {test.name}?</h3>
                    <p className="text-gray-300 mb-6">Position yourself in front of the camera and click start when ready</p>
                    <button onClick={startTest} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto disabled:opacity-60" disabled={busy}>
                      <Play size={20} />
                      <span>Start Test</span>
                    </button>
                    <div className="mt-4 text-sm text-gray-300">{sessionId ? `Session: ${sessionId}` : busy ? 'Connecting to AI backend...' : ''}</div>
                  </motion.div>
                )}

                {currentStage === 'countdown' && (
                  <motion.div key="countdown" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="text-center text-white">
                    <div className="text-8xl font-bold mb-4">{countdown}</div>
                    <p className="text-xl text-gray-300">Get ready...</p>
                  </motion.div>
                )}

                {currentStage === 'recording' && (
                  <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-4 border-2 border-red-500 rounded-lg"></div>
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center space-x-2 mb-4"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div><span className="text-lg font-semibold">RECORDING</span></div>
                      <div className="text-3xl font-bold mb-4">{formatTime(recordingTime)}</div>
                      <button onClick={stopRecording} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"><Square size={20} /><span>Stop Recording</span></button>
                    </div>
                  </motion.div>
                )}

                {currentStage === 'results' && testResult && (
                  <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center text-white p-8">
                    <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
                    <h3 className="text-2xl font-bold mb-2">Test Complete!</h3>
                    <div className="text-4xl font-bold text-green-400 mb-2">{testResult.score} {testResult.unit}</div>
                    <p className="text-gray-300 mb-6">{testResult.percentile}th percentile</p>
                    <button onClick={retakeTest} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto"><RotateCcw size={20} /><span>Retake Test</span></button>
                  </motion.div>
                )}

                {/* Fallback content if no stage is active */}
                {!currentStage && (
                  <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white p-8">
                    <Camera size={64} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Ready to start your {test.name}?</h3>
                    <p className="text-gray-300 mb-6">Position yourself in front of the camera and click start when ready</p>
                    <button onClick={startTest} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto disabled:opacity-60" disabled={busy}>
                      <Play size={20} />
                      <span>Start Test</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 bg-gray-50 border-t">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600"><Clock size={16} /><span className="text-sm">Duration: {test.duration}</span></div>
                <div className="flex items-center space-x-2 text-gray-600"><Users size={16} /><span className="text-sm">Equipment: {test.equipment.join(', ')}</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4"><Info size={18} className="text-blue-600" /><h3 className="text-base lg:text-lg font-semibold text-gray-900">Instructions</h3></div>
            <ol className="space-y-2 lg:space-y-3">
              {test.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3"><span className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs lg:text-sm font-medium">{index + 1}</span><span className="text-xs lg:text-sm text-gray-700">{instruction}</span></li>
              ))}
            </ol>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-yellow-50 rounded-xl p-4 lg:p-6 border border-yellow-200">
            <h3 className="text-base lg:text-lg font-semibold text-yellow-900 mb-3 lg:mb-4">💡 Tips for Success</h3>
            <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-yellow-800">
              <li>• Ensure good lighting for accurate AI analysis</li>
              <li>• Wear form-fitting clothes for better tracking</li>
              <li>• Clear the area around you of obstacles</li>
              <li>• Focus on proper form over speed</li>
              <li>• Take breaks between attempts if needed</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Your Recent Results</h3>
            <div className="space-y-2 lg:space-y-3">
              {[
                { score: '42 reps', date: 'Jan 10', percentile: 78 },
                { score: '39 reps', date: 'Jan 3', percentile: 72 },
                { score: '36 reps', date: 'Dec 27', percentile: 68 }
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="font-medium text-gray-900">{result.score}</p><p className="text-xs text-gray-500">{result.date}</p></div><span className="text-sm font-medium text-green-600">{result.percentile}%</span></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




