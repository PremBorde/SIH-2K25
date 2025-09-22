'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  // Check if user is on a public page (login, home)
  const isPublicPage = pathname === '/' || pathname === '/login';

  useEffect(() => {
    // Simple authentication check - in a real app, this would check tokens, cookies, etc.
    // For now, we'll consider user authenticated if they're not on public pages
    setIsAuthenticated(!isPublicPage);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Only show navbar and sidebar for authenticated pages */}
          {isAuthenticated ? (
            <>
              <Navbar onMenuToggle={toggleSidebar} isMobileMenuOpen={isSidebarOpen} />
              
              <div className="flex">
                <div className="hidden md:block md:w-72 flex-shrink-0">
                  <Sidebar isOpen={true} onClose={closeSidebar} />
                </div>
                
                {/* Mobile sidebar */}
                <div className="md:hidden">
                  <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                </div>

                <main className="flex-1 md:ml-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-7xl mx-auto p-4 sm:p-6"
                  >
                    {children}
                  </motion.div>
                </main>
              </div>
            </>
          ) : (
            /* Public pages (login, home) - no navbar or sidebar */
            <main>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </main>
          )}
        </div>
      </body>
    </html>
  );
}