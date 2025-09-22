'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Briefcase, Calendar, MapPin } from 'lucide-react';
import { Opportunity, api } from '@/lib/mockData';
import OpportunityCard from '@/components/OpportunityCard';
import { motion } from 'framer-motion';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSport, setSelectedSport] = useState('All Sports');

  const types = ['All Types', 'Scholarship', 'Trial', 'Camp', 'Coaching'];
  const sports = ['All Sports', 'Track & Field', 'Basketball', 'Soccer', 'Swimming', 'Tennis'];

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const opportunitiesData = await api.fetchOpportunities();
        setOpportunities(opportunitiesData);
      } catch (error) {
        console.error('Error loading opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || 
                       opportunity.type.toLowerCase() === selectedType.toLowerCase();
    
    const matchesSport = selectedSport === 'All Sports' || 
                        opportunity.sport === selectedSport;
    
    return matchesSearch && matchesType && matchesSport;
  });

  const stats = {
    total: opportunities.length,
    applied: opportunities.filter(opp => opp.applied).length,
    scholarships: opportunities.filter(opp => opp.type === 'scholarship').length,
    deadlineSoon: opportunities.filter(opp => {
      const deadline = new Date(opp.deadline);
      const now = new Date();
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-gray-600 mt-1">Discover scholarships, trials, camps, and coaching opportunities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Briefcase size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">{opportunities.length} Opportunities</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Briefcase size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Available</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 font-bold text-lg">✓</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.applied}</div>
          <div className="text-sm text-gray-500">Applied</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-yellow-600 font-bold text-lg">🎓</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{stats.scholarships}</div>
          <div className="text-sm text-gray-500">Scholarships</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar size={24} className="text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600">{stats.deadlineSoon}</div>
          <div className="text-sm text-gray-500">Deadline Soon</div>
        </motion.div>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white min-w-32"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white min-w-36"
              >
                {sports.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Opportunities Grid */}
      <div>
        {filteredOpportunities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <OpportunityCard opportunity={opportunity} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Opportunities */}
      {filteredOpportunities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-200"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🌟 Featured Opportunities</h2>
            <p className="text-gray-600">Don't miss these top opportunities with upcoming deadlines</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunities
              .filter(opp => {
                const deadline = new Date(opp.deadline);
                const now = new Date();
                const diffTime = deadline.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 14;
              })
              .slice(0, 2)
              .map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
                      <p className="text-gray-600">{opportunity.organization}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Urgent
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{opportunity.description}</p>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}