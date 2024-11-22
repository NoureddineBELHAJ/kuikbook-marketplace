import { useState, useEffect, useRef } from 'react';
import { useMessages } from '../../hooks/useMessages';
import { useAuth } from '../../hooks/useAuth';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatWindow({ recipientId, conversationId }) {
  const { user } = useAuth();
  const { 
    messages, 
    sendMessage, 
    getConversationMessages,
    markAsRead,
    isLoading 
  } = useMessages();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      getConversationMessages(conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage(recipientId, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleMessageRead = (messageId) => {
    if (messageId) {
      markAsRead(messageId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === user.id ? 'justify-end' : 'justify-start'
            }`}
            onMouseEnter={() => !message.read && handleMessageRead(message.id)}
          >
            <div
              className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                message.senderId === user.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn-primary p-2"
            disabled={isLoading || !newMessage.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}