'use client';

import { Message } from '@/lib/mockData';

interface MessageBoxProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function MessageBox({ message, isOwnMessage }: MessageBoxProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwnMessage 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        {!isOwnMessage && (
          <p className="text-xs font-medium mb-1 text-gray-600">{message.senderName}</p>
        )}
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${
          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}