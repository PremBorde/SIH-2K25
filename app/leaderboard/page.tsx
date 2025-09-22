'use client';

import { useEffect, useState } from 'react';
import { Filter, Trophy, Medal, Award } from 'lucide-react';
import { Athlete, api } from '@/lib/mockData';
import LeaderboardTable from '@/components/LeaderboardTable';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedAge, setSelectedAge] = useState('All Ages');

  const sports = ['All Sports', 'Track & Field', 'Basketball', 'Soccer', 'Swimming', 'Tennis'];
  const regions = ['All Regions', 'California', 'Texas', 'Florida', 'New York', 'Illinois'];
  const ageGroups = ['All Ages', 'Under 18', '18-22', '23-25', 'Over 25'];

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await api.fetchLeaderboard(selectedSport, selectedRegion);
        setAthletes(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [selectedSport, selectedRegion, selectedAge]);

  const topPerformers = athletes.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Athlete Leaderboard</h1>
        <p className="text-gray-600">Compete with athletes worldwide and track your ranking</p>
      </div>

      {/* Top 3 Podium */}
      {topPerformers.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8"
        >
          <div className="flex items-end justify-center space-x-8">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
                  <img
                    src={topPerformers[1].profilePicture}
                    alt={topPerformers[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <Medal size={16} className="text-white" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 h-24 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-900 text-sm">{topPerformers[1].name}</h3>
                <p className="text-xs text-gray-600">{topPerformers[1].sport}</p>
                <p className="text-lg font-bold text-gray-600">#2</p>
              </div>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                  <img
                    src={topPerformers[0].profilePicture}
                    alt={topPerformers[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy size={20} className="text-white" />
                </div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 h-28 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-900">{topPerformers[0].name}</h3>
                <p className="text-sm text-gray-600">{topPerformers[0].sport}</p>
                <p className="text-2xl font-bold text-yellow-600">#1</p>
              </div>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-300 shadow-lg">
                  <img
                    src={topPerformers[2].profilePicture}
                    alt={topPerformers[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
              </div>
              <div className="bg-orange-100 rounded-lg p-4 h-24 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-900 text-sm">{topPerformers[2].name}</h3>
                <p className="text-xs text-gray-600">{topPerformers[2].sport}</p>
                <p className="text-lg font-bold text-orange-600">#3</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Filter size={20} className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Results</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {ageGroups.map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{athletes.length}</div>
          <div className="text-sm text-gray-500">Total Athletes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {athletes.length > 0 ? Math.round(athletes.reduce((sum, athlete) => 
              sum + athlete.testResults.reduce((testSum, test) => testSum + test.percentile, 0) / athlete.testResults.length, 0
            ) / athletes.length) : 0}%
          </div>
          <div className="text-sm text-gray-500">Avg Performance</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">24</div>
          <div className="text-sm text-gray-500">Your Rank</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">+5</div>
          <div className="text-sm text-gray-500">This Week</div>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <LeaderboardTable athletes={athletes} loading={loading} />
      </motion.div>
    </div>
  );
}