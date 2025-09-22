'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, MessageCircle, User, Settings, LogOut, Menu, X, Download, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, Athlete, mockAthletes } from '@/lib/mockData';

interface NavbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Navbar({ onMenuToggle, isMobileMenuOpen }: NavbarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [health, setHealth] = useState<'online' | 'offline' | ''>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const athlete = mockAthletes.find(a => a.id === '1');
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    fetch('/api/health', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (mounted) setHealth(d?.status === 'healthy' ? 'online' : 'offline'); })
      .catch(() => { if (mounted) setHealth('offline'); });
    return () => { mounted = false; };
  }, []);


  return (
    <nav className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full h-16 px-4 flex items-center justify-between">
        {/* Left: Logo & mobile menu */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={onMenuToggle} className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <img src="/Images/LOGO.png" alt="AthletConnect" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-lg font-bold text-blue-600">AthletConnect</span>
          </Link>
        </div>

        {/* Center: Search + Badges */}
        <div className="hidden md:flex items-center justify-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search athletes, sports, opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          
          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              <span>🏆</span>
              <span>Rank #24</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              <span>⭐</span>
              <span>12 Tests</span>
            </div>
            <motion.button 
              onClick={async () => {
                if (isDownloading) return;
                
                setIsDownloading(true);
                
                // Simulate download progress
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Create a sample file to download
                const data = "AthletConnect App - Your Sports Performance Tracker\n\nFeatures:\n- Track athletic performance\n- Connect with athletes\n- Discover opportunities\n- View leaderboards\n\nDownload the full app from our website!";
                const blob = new Blob([data], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'AthletConnect-App-Info.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                setIsDownloading(false);
                setDownloadComplete(true);
                
                // Reset after 3 seconds
                setTimeout(() => setDownloadComplete(false), 3000);
              }}
              disabled={isDownloading}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                downloadComplete 
                  ? 'bg-green-100 text-green-700 scale-105' 
                  : isDownloading 
                    ? 'bg-orange-200 text-orange-800 animate-pulse' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105'
              }`}
              whileHover={{ scale: isDownloading ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isDownloading ? Infinity : 0, ease: "linear" }}
              >
                {downloadComplete ? (
                  <Check size={12} />
                ) : isDownloading ? (
                  <Download size={12} />
                ) : (
                  <span>📱</span>
                )}
              </motion.div>
              <span>
                {downloadComplete ? 'Downloaded!' : isDownloading ? 'Downloading...' : 'Download App'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Right: Icons + profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notification Icons */}
          <div className="flex items-center gap-1">
            <Link href="/messages" className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <MessageCircle size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </Link>
            <button className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <img src={athlete?.profilePicture || '/Images/profile_pic.png'} alt={athlete?.name || 'Profile'} className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">{athlete?.name || 'User'}</span>
            </button>
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  <Link href="/profile/1" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                    <User size={16} className="mr-3" />
                    My Profile
                  </Link>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings size={16} className="mr-3" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <Link href="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                    <LogOut size={16} className="mr-3" />
                    Sign out
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}