import { create } from 'zustand';
import { io } from 'socket.io-client';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

// Initialize socket connection
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
  autoConnect: false
});

const useMessagesStore = create((set, get) => ({
  messages: [],
  conversations: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  socket: null,

  // Initialize socket connection
  initializeSocket: () => {
    if (!socket.connected) {
      socket.connect();
      
      // Listen for new messages
      socket.on('newMessage', (message) => {
        set(state => ({
          messages: [...state.messages, message],
          unreadCount: state.unreadCount + 1
        }));
        
        toast.success('New message received');
      });

      // Listen for message status updates
      socket.on('messageStatus', ({ messageId, status }) => {
        set(state => ({
          messages: state.messages.map(msg =>
            msg.id === messageId ? { ...msg, status } : msg
          )
        }));
      });

      set({ socket });
    }
  },

  // Clean up socket connection
  cleanup: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  // Send message
  sendMessage: async (recipientId, content, type = 'text') => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post('/messages', {
        recipientId,
        content,
        type
      });

      set(state => ({
        messages: [...state.messages, data.message]
      }));

      // Emit through socket
      if (socket.connected) {
        socket.emit('sendMessage', data.message);
      }

      return data.message;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to send message: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get conversation messages
  getConversationMessages: async (conversationId) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get(`/conversations/${conversationId}/messages`);
      
      set({ 
        messages: data.messages,
        unreadCount: data.unreadCount
      });
      
      return data.messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Get user conversations
  getUserConversations: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get('/conversations');
      set({ conversations: data.conversations });
      return data.conversations;
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      await api.patch(`/messages/${messageId}/read`);
      
      set(state => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  },

  // Mark all messages as read
  markAllAsRead: async (conversationId) => {
    try {
      await api.patch(`/conversations/${conversationId}/read`);
      
      set(state => ({
        messages: state.messages.map(msg => ({ ...msg, read: true })),
        unreadCount: 0
      }));
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      await api.delete(`/messages/${messageId}`);
      
      set(state => ({
        messages: state.messages.filter(msg => msg.id !== messageId)
      }));
      
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  }
}));

export const useMessages = () => {
  const store = useMessagesStore();
  
  // Initialize socket when the hook is first used
  useEffect(() => {
    store.initializeSocket();
    return () => store.cleanup();
  }, []);

  return store;
};