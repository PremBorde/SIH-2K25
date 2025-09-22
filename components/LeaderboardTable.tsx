'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Trophy, Medal, Award } from 'lucide-react';
import { Athlete } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface LeaderboardTableProps {
  athletes: Athlete[];
  loading?: boolean;
}

type SortField = 'rank' | 'name' | 'sport' | 'score';
type SortOrder = 'asc' | 'desc';

export default function LeaderboardTable({ athletes, loading = false }: LeaderboardTableProps) {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortedAthletes, setSortedAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    const sorted = [...athletes].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'sport':
          aValue = a.sport.toLowerCase();
          bValue = b.sport.toLowerCase();
          break;
        case 'score':
          aValue = a.testResults.reduce((sum, test) => sum + test.percentile, 0) / a.testResults.length;
          bValue = b.testResults.reduce((sum, test) => sum + test.percentile, 0) / b.testResults.length;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedAthletes(sorted);
  }, [athletes, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="text-yellow-500" size={20} />;
      case 1:
        return <Medal className="text-gray-400" size={20} />;
      case 2:
        return <Award className="text-orange-500" size={20} />;
      default:
        return <span className="text-gray-600 font-bold">{index + 1}</span>;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="text-gray-300" size={16} />;
    return sortOrder === 'asc' ? 
      <ChevronUp className="text-blue-600" size={16} /> : 
      <ChevronDown className="text-blue-600" size={16} />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('rank')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Rank</span>
                  <SortIcon field="rank" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Athlete</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('sport')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Sport</span>
                  <SortIcon field="sport" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Avg Score</span>
                  <SortIcon field="score" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tests
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAthletes.map((athlete, index) => {
              const avgScore = Math.round(
                athlete.testResults.reduce((sum, test) => sum + test.percentile, 0) / athlete.testResults.length
              );
              
              return (
                <motion.tr
                  key={athlete.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => window.location.href = `/profile/${athlete.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                          <img
                            src={athlete.profilePicture}
                            alt={athlete.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {athlete.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                        <div className="text-sm text-gray-500">{athlete.age} years old</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {athlete.sport}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {athlete.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-green-600">{avgScore}%</span>
                      <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {athlete.testResults.length} completed
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}