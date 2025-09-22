'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Trophy, Users, MessageCircle } from 'lucide-react';
import { Athlete } from '@/lib/mockData';
import { motion } from 'framer-motion';
import ConnectButton from './ConnectButton';

interface ProfileCardProps {
  athlete: Athlete;
  compact?: boolean;
}

export default function ProfileCard({ athlete, compact = false }: ProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(athlete.following);

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  };

  const averagePercentile = Math.round(
    athlete.testResults.reduce((sum, test) => sum + test.percentile, 0) / athlete.testResults.length
  );

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <Link href={`/profile/${athlete.id}`}>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src={athlete.profilePicture}
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {athlete.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{athlete.name}</h3>
              <p className="text-xs text-gray-500">{athlete.sport}</p>
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <MapPin size={10} className="mr-1" />
                {athlete.location}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-blue-600">{averagePercentile}%</div>
              <div className="text-xs text-gray-500">Avg Score</div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-blue-400 to-green-400 relative">
        <img
          src={athlete.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <ConnectButton 
            size="sm"
            onConnect={() => setIsFollowing(true)}
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Picture */}
          <div className="relative -mt-12">
            <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={athlete.profilePicture}
                alt={athlete.name}
                className="w-full h-full object-cover"
              />
            </div>
            {athlete.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 mt-2">
            <Link href={`/profile/${athlete.id}`}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {athlete.name}
              </h3>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 font-medium">{athlete.sport}</p>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              {athlete.location}
              <span className="mx-2">•</span>
              <span>{athlete.age} years old</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-base sm:text-lg font-bold text-gray-900">{athlete.testResults.length}</div>
            <div className="text-xs text-gray-500">Tests</div>
          </div>
          <div className="text-center">
            <div className="text-base sm:text-lg font-bold text-blue-600">{averagePercentile}%</div>
            <div className="text-xs text-gray-500">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-base sm:text-lg font-bold text-green-600">#{Math.floor(Math.random() * 100) + 1}</div>
            <div className="text-xs text-gray-500">Ranking</div>
          </div>
        </div>

        {/* Recent Achievement */}
        {athlete.achievements.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2">
              <Trophy size={16} className="text-yellow-600" />
              <span className="text-sm text-gray-700">{athlete.achievements[0]}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link
            href={`/profile/${athlete.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors text-center"
          >
            View Profile
          </Link>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageCircle size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}