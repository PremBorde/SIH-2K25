'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Target, MessageCircle, ArrowRight } from 'lucide-react';
import { Activity, Brain, Mic, Sparkles, Rocket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[102vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-8"
          >
            {/* Logo */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center gap-6 mb-4">
                <img src="/Images/LOGO.png" alt="AthletConnect" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    AthletConnect
                  </span>
                </h1>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to the Future of Sports Networking
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
              Connect with athletes, discover opportunities, and showcase your talent on the world&apos;s premier sports networking platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center mb-12 px-4">
              <Link
                href="/login"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
              >
                Sign In
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pt-10 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Discover opportunities, connect with peers, and track your progress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Trophy className="w-8 h-8 text-blue-600" />,
                title: "Leaderboards",
                description: "See how you rank against other athletes in your sport and region"
              },
              {
                icon: <Users className="w-8 h-8 text-green-600" />,
                title: "Networking",
                description: "Connect with athletes, coaches, and scouts from around the world"
              },
              {
                icon: <Target className="w-8 h-8 text-purple-600" />,
                title: "Opportunities",
                description: "Discover scholarships, trials, camps, and coaching opportunities"
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-orange-600" />,
                title: "Messaging",
                description: "Communicate directly with coaches, scouts, and fellow athletes"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* (Sections below intentionally removed as requested) */}
    </div>
  );
}