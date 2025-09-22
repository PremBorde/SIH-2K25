'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Check, X } from 'lucide-react';

interface ConnectButtonProps {
  onConnect?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConnectButton({ 
  onConnect, 
  className = '', 
  size = 'md' 
}: ConnectButtonProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  const playConnectSound = () => {
    // Create a simple success sound using Web Audio API
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a pleasant success sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequency for a pleasant "ding" sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
      
      // Set volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    }
  };

  const handleConnect = async () => {
    if (isConnected || isConnecting) return;

    setIsConnecting(true);
    playConnectSound();

    // Simulate connection process - reduced from 1500ms to 600ms
    await new Promise(resolve => setTimeout(resolve, 600));

    setIsConnecting(false);
    setIsConnected(true);
    setShowSuccess(true);

    // Call the onConnect callback if provided
    if (onConnect) {
      onConnect();
    }

    // Hide success state after 1.5 seconds (reduced from 3 seconds)
    setTimeout(() => setShowSuccess(false), 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShowSuccess(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className={`
          relative overflow-hidden font-medium rounded-lg transition-all duration-300
          flex items-center space-x-2
          ${sizeClasses[size]}
          ${isConnected 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
            : isConnecting
              ? 'bg-blue-500 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
          }
          ${className}
        `}
        whileHover={!isConnecting ? { scale: 1.02 } : {}}
        whileTap={!isConnecting ? { scale: 0.98 } : {}}
      >
        {/* Ripple effect background */}
        <motion.div
          className="absolute inset-0 bg-blue-400 rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={isConnecting ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, repeat: isConnecting ? Infinity : 0 }}
        />

        {/* Button content */}
        <div className="relative flex items-center space-x-2">
          {isConnecting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            >
              <UserPlus size={iconSizes[size]} />
            </motion.div>
          ) : isConnected ? (
            <Check size={iconSizes[size]} />
          ) : (
            <UserPlus size={iconSizes[size]} />
          )}

          <span>
            {isConnecting 
              ? 'Connecting...' 
              : isConnected 
                ? 'Connected' 
                : 'Connect'
            }
          </span>
        </div>

        {/* Success checkmark animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 800 }}
              >
                <Check size={12} className="text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection particles effect */}
        <AnimatePresence>
          {isConnecting && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: Math.cos(i * 60 * Math.PI / 180) * 30,
                    y: Math.sin(i * 60 * Math.PI / 180) * 30,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.05,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute w-1 h-1 bg-blue-300 rounded-full"
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Success message popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 800, damping: 25 }}
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap z-10"
          >
            Connection successful!
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
