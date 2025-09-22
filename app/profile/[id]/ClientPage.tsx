'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { 
  MapPin, 
  Calendar, 
  Ruler, 
  Scale, 
  Trophy, 
  Play, 
  MessageCircle,
  UserPlus,
  MoreHorizontal,
  TrendingUp,
  Activity,
  CheckCircle
} from 'lucide-react';
import { Athlete, api } from '@/lib/mockData';
import { motion } from 'framer-motion';
import ConnectButton from '@/components/ConnectButton';

export default function ProfileClientPage() {
  const params = useParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'achievements' | 'videos'>('overview');

  useEffect(() => {
    const loadAthlete = async () => {
      if (params.id) {
        try {
          const athleteData = await api.fetchAthlete(params.id as string);
          setAthlete(athleteData);
        } catch (error) {
          console.error('Error loading athlete:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAthlete();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          {/* Cover photo skeleton */}
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          
          {/* Profile info skeleton */}
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Stats skeleton */}
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Athlete not found</h2>
        <p className="text-gray-600 mt-2">The athlete profile you'sre looking for doesn't exist.</p>
      </div>
    );
  }

  const averagePercentile = Math.round(
    athlete.testResults.reduce((sum, test) => sum + test.percentile, 0) / athlete.testResults.length
  );

  return (
    <div className="space-y-8">
      {/* Cover Photo & Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Cover Photo */}
        <div className="h-64 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl overflow-hidden">
          <img
            src={athlete.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Profile Info */}
        <div className="relative -mt-20 px-8">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            {/* Profile Picture */}
            <div className="relative mb-4 md:mb-0">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={athlete.profilePicture}
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {athlete.verified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{athlete.name}</h1>
                  <p className="text-lg text-gray-600 font-medium">{athlete.sport}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{athlete.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{athlete.age} years old</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Ruler size={16} />
                      <span>{athlete.height}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Scale size={16} />
                      <span>{athlete.weight}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <ConnectButton 
                    size="md"
                    onConnect={() => {
                      // Handle successful connection
                      console.log('Connected successfully!');
                    }}
                  />
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <MessageCircle size={18} />
                    <span>Message</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Activity size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.testResults.length}</div>
          <div className="text-sm text-gray-500">Tests Completed</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{averagePercentile}%</div>
          <div className="text-sm text-gray-500">Avg Performance</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Trophy size={24} className="text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">#{Math.floor(Math.random() * 100) + 1}</div>
          <div className="text-sm text-gray-500">Overall Rank</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Trophy size={24} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{athlete.achievements.length}</div>
          <div className="text-sm text-gray-500">Achievements</div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'tests', name: 'Test Results' },
            { id: 'achievements', name: 'Achievements' },
            { id: 'videos', name: 'Videos' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Bests */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Bests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(athlete.personalBests).map(([event, record]) => (
                  <div key={event} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{event}</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{record}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Height</span>
                  <span className="font-medium">{athlete.height}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{athlete.weight}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Age</span>
                  <span className="font-medium">{athlete.age} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sport</span>
                  <span className="font-medium">{athlete.sport}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <div className="flex items-center space-x-1">
                    {athlete.verified && <CheckCircle size={14} className="text-blue-600" />}
                    <span className={`font-medium ${athlete.verified ? 'text-blue-600' : 'text-gray-500'}`}>
                      {athlete.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Test Results</h3>
            <div className="space-y-4">
              {athlete.testResults.map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{test.testName}</h4>
                      <p className="text-sm text-gray-500">{new Date(test.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{test.score} {test.unit}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-green-600 font-medium">{test.percentile}th percentile</span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${test.percentile}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {athlete.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <Trophy size={20} className="text-yellow-600" />
                  <span className="font-medium text-gray-900">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Training Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {athlete.videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                    <Play size={48} className="text-gray-400" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play size={24} className="text-gray-900 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900">{video}</h4>
                    <p className="text-sm text-gray-500 mt-1">2 days ago • 3:24</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}


