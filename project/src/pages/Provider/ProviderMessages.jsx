import { useState, useEffect } from 'react';
import { useMessages } from '../../hooks/useMessages';
import ChatWindow from '../../components/chat/ChatWindow';
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export default function ProviderMessages() {
  const { 
    conversations, 
    getUserConversations,
    markAllAsRead 
  } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUserConversations();
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (!conversation.read) {
      markAllAsRead(conversation.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-provider-500 focus:border-provider-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-16rem)]">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={clsx(
                  'w-full p-4 flex items-start hover:bg-gray-50 transition-colors duration-200',
                  selectedConversation?.id === conversation.id && 'bg-gray-50',
                  !conversation.read && 'bg-provider-50'
                )}
              >
                <div className="flex-shrink-0">
                  {conversation.participant.avatar ? (
                    <img
                      src={conversation.participant.avatar}
                      alt={conversation.participant.name}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-provider-100 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-provider-600" />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(conversation.lastMessage.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedConversation ? (
            <ChatWindow
              recipientId={selectedConversation.participant.id}
              conversationId={selectedConversation.id}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}