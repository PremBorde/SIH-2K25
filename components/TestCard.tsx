'use client';

import Link from 'next/link';
import { Clock, Users, Play } from 'lucide-react';
import { Test } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 sm:p-6">
        {/* Test Icon and Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{test.icon}</span>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{test.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{test.description}</p>
          </div>
        </div>

        {/* Test Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>Duration: {test.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} />
            <span>Equipment: {test.equipment.join(', ')}</span>
          </div>
        </div>

        {/* Recent Participants */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2">Recent participants</p>
          <div className="flex -space-x-2">
            {[
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
              'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
              'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
            ].map((avatar, index) => (
              <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img src={avatar} alt="Participant" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600">+{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/tests/${test.id}`}>
          <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
            <Play size={16} />
            <span>Start Test</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}