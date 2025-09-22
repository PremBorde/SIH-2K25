'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Trophy, Calendar, MessageCircle, Activity } from 'lucide-react';
import { Athlete, Opportunity, TestResult, api, mockAthletes } from '@/lib/mockData';
import ProfileCard from '@/components/ProfileCard';
import OpportunityCard from '@/components/OpportunityCard';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalAthletes: number;
  testsCompleted: number;
  activeOpportunities: number;
  unreadMessages: number;
}

export default function DashboardPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const stats: DashboardStats = {
    totalAthletes: 1247,
    testsCompleted: 3592,
    activeOpportunities: 28,
    unreadMessages: 5
  };

  const recentTestResults: TestResult[] = [
    { testName: 'Vertical Jump', score: 28, unit: 'inches', date: '2024-01-15', percentile: 85 },
    { testName: 'Sprint 40yd', score: 4.8, unit: 'seconds', date: '2024-01-14', percentile: 92 },
    { testName: 'Push-ups', score: 45, unit: 'reps', date: '2024-01-13', percentile: 78 },
    { testName: 'Agility Test', score: 6.2, unit: 'seconds', date: '2024-01-12', percentile: 88 }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [athletesData, opportunitiesData] = await Promise.all([
          api.fetchAthletes(),
          api.fetchOpportunities()
        ]);

        setAthletes(athletesData);
        setOpportunities(opportunitiesData.slice(0, 3)); // Show only first 3
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Athletes',
      value: stats.totalAthletes.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'blue'
    },
    {
      title: 'Tests Completed',
      value: stats.testsCompleted.toLocaleString(),
      icon: Activity,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'green'
    },
    {
      title: 'Active Opportunities',
      value: stats.activeOpportunities.toString(),
      icon: Trophy,
      change: '+3',
      changeType: 'positive' as const,
      color: 'yellow'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages.toString(),
      icon: MessageCircle,
      change: 'New',
      changeType: 'neutral' as const,
      color: 'red'
    }
  ];

  const getStatCardColors = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {mockAthletes[0]?.name || 'Athlete'}!</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Here's what's happening in your athletic journey</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm text-gray-500">Last login</p>
          <p className="text-xs sm:text-sm font-medium text-gray-900">Today, 9:30 AM</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getStatCardColors(stat.color)}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative' 
                      ? 'text-red-600' 
                      : 'text-blue-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Test Results */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Test Results</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentTestResults.map((result, index) => (
              <motion.div
                key={result.testName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{result.testName}</h3>
                    <p className="text-sm text-gray-500">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{result.score} {result.unit}</p>
                  <p className="text-sm text-green-600">{result.percentile}th percentile</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="font-medium text-blue-900">Sprint Test</p>
              </div>
              <p className="text-sm text-blue-700">Tomorrow, 2:00 PM</p>
            </div>
            <div className="p-3 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <p className="font-medium text-green-900">Team Training</p>
              </div>
              <p className="text-sm text-green-700">Jan 18, 6:00 AM</p>
            </div>
            <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <p className="font-medium text-yellow-900">Scholarship Deadline</p>
              </div>
              <p className="text-sm text-yellow-700">Jan 20, 11:59 PM</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Top Performers This Week</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Leaderboard
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {athletes.slice(0, 3).map((athlete, index) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <ProfileCard athlete={athlete} compact={true} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">New Opportunities</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Opportunities
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <OpportunityCard opportunity={opportunity} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}