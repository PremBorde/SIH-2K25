'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';
import { Opportunity } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isApplied, setIsApplied] = useState(opportunity.applied);
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
  };

  const getTypeIcon = () => {
    switch (opportunity.type) {
      case 'scholarship':
        return '🎓';
      case 'trial':
        return '⚽';
      case 'camp':
        return '🏕️';
      case 'coaching':
        return '🎯';
      default:
        return '📋';
    }
  };

  const getTypeColor = () => {
    switch (opportunity.type) {
      case 'scholarship':
        return 'bg-blue-100 text-blue-800';
      case 'trial':
        return 'bg-green-100 text-green-800';
      case 'camp':
        return 'bg-orange-100 text-orange-800';
      case 'coaching':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{getTypeIcon()}</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{opportunity.title}</h3>
              <p className="text-sm text-gray-600">{opportunity.organization}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeColor()}`}>
            {opportunity.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-xs sm:text-sm mb-4 line-clamp-2">{opportunity.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Users size={12} />
            <span>{opportunity.sport}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <MapPin size={12} />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Calendar size={12} />
            <span>Deadline: {formatDate(opportunity.deadline)}</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              daysUntilDeadline <= 7 
                ? 'bg-red-100 text-red-800' 
                : daysUntilDeadline <= 30 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
            }`}>
              {daysUntilDeadline} days left
            </span>
          </div>
        </div>

        {/* Requirements Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-4"
        >
          {showDetails ? 'Hide Requirements' : 'View Requirements'}
        </button>

        {/* Requirements List */}
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
              <ul className="space-y-1">
                {opportunity.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        {isApplied ? (
          <button
            disabled
            className="w-full bg-green-100 text-green-800 py-2 sm:py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 cursor-not-allowed text-sm sm:text-base"
          >
            <CheckCircle size={16} />
            <span>Applied</span>
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <span>Apply Now</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}