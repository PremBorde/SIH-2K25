'use client';

import { useEffect, useState } from 'react';
import { Send, Search, MoreHorizontal, Phone, Video } from 'lucide-react';
import { Conversation, Message, api } from '@/lib/mockData';
import MessageBox from '@/components/MessageBox';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock messages for the selected conversation
  const mockMessages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        senderId: '2',
        senderName: 'Arjun Singh',
        content: 'Hey Priya! Great performance at the meet yesterday.',
        timestamp: '2024-01-15T14:30:00Z',
        read: true
      },
      {
        id: '2',
        senderId: '2',
        senderName: 'Arjun Singh',
        content: 'Would love to connect and maybe train together sometime. I think we could help each other improve!',
        timestamp: '2024-01-15T14:31:00Z',
        read: false
      },
      {
        id: '3',
        senderId: '1',
        senderName: 'Neeraj Chopra',
        content: 'Thanks Arjun! That sounds great. I saw your basketball highlights - really impressive vertical jump.',
        timestamp: '2024-01-15T14:45:00Z',
        read: true
      },
      {
        id: '4',
        senderId: '2',
        senderName: 'Arjun Singh',
        content: 'Appreciate it! Your sprint times are incredible. Maybe we can do some cross-training sessions?',
        timestamp: '2024-01-15T14:47:00Z',
        read: false
      }
    ],
    '2': [
      {
        id: '5',
        senderId: '1',
        senderName: 'Neeraj Chopra',
        content: 'Thanks for the tips on sprint training! Really helped improve my technique.',
        timestamp: '2024-01-14T09:15:00Z',
        read: true
      },
      {
        id: '6',
        senderId: '3',
        senderName: 'Priya Sharma',
        content: 'No problem! Let me know if you want to practice together next week.',
        timestamp: '2024-01-14T09:20:00Z',
        read: true
      }
    ],
    '6': [
      {
        id: '7',
        senderId: '7',
        senderName: 'Sports Authority of India',
        content: 'Congratulations on your recent achievements! We are pleased to invite you to our elite training program at SAI Bangalore.',
        timestamp: '2024-01-18T10:00:00Z',
        read: false
      },
      {
        id: '8',
        senderId: '7',
        senderName: 'Sports Authority of India',
        content: 'Your performance metrics show excellent potential for international competition. Please respond to confirm your participation.',
        timestamp: '2024-01-18T10:05:00Z',
        read: false
      }
    ]
  };

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const conversationsData = await api.fetchConversations();
        setConversations(conversationsData);
        if (conversationsData.length > 0) {
          setSelectedConversation(conversationsData[0]);
          setMessages(mockMessages[conversationsData[0].id] || []);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages[conversation.id] || []);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'Neeraj Chopra',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.participants.some(participant =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="h-[600px] flex">
        <div className="w-1/3 border-r border-gray-200 p-4">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[600px] flex">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation, index) => {
            const otherParticipant = conversation.participants.find(p => p.id !== '1');
            if (!otherParticipant) return null;

            return (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelectConversation(conversation)}
                className={`p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {otherParticipant.name.split(' ').slice(0,2).map(n=>n[0]).join('')}
                      </span>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{conversation.unreadCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{otherParticipant.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {selectedConversation.participants.find(p => p.id !== '1')?.name.split(' ').slice(0,2).map(n=>n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedConversation.participants.find(p => p.id !== '1')?.name}
                  </h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MessageBox
                      message={message}
                      isOwnMessage={message.senderId === '1'}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} />
              </div>
              <p className="text-lg font-medium">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}