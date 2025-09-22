'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  Trophy, 
  MessageCircle, 
  Briefcase,
  X,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, Athlete, mockAthletes } from '@/lib/mockData'; // Import api, Athlete, and mockAthletes

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Profile',
    href: '/profile/1',
    icon: User,
  },
  {
    name: 'Tests',
    href: '/tests',
    icon: Activity,
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    icon: Trophy,
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: MessageCircle,
    badge: 2,
  },
  {
    name: 'Opportunities',
    href: '/opportunities',
    icon: Briefcase,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  // Use mockAthletes directly to find the athlete
  const athlete = mockAthletes.find(a => a.id === '1'); 

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 md:translate-x-0 md:shadow-none md:border-r border-gray-200 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto"
      >
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold text-gray-900">AthletConnect</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={athlete?.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                alt={athlete?.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{athlete?.name || 'Loading...'}</h3>
              <p className="text-sm text-gray-500">{athlete?.sport || ''}</p>
              {athlete?.verified && (
                <div className="flex items-center space-x-1 mt-1">
                  <CheckCircle size={12} className="text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">Verified Athlete</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => onClose()}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick stats */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Your Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Tests Completed</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Ranking</span>
                <span className="font-semibold text-green-600">#24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Connections</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}