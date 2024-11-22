// Mock authentication service for development
const mockUsers = new Map();

export const mockAuth = {
  currentUser: null,

  async createUser({ email, password, displayName }) {
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email');
    }

    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password');
    }

    if (mockUsers.has(email)) {
      throw new Error('auth/email-already-in-use');
    }

    const user = {
      uid: Date.now().toString(),
      email,
      displayName: displayName || email.split('@')[0],
      emailVerified: false,
      createdAt: new Date().toISOString()
    };

    mockUsers.set(email, { user, password });
    this.currentUser = user;
    return { user };
  },

  async signIn({ email, password }) {
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email');
    }

    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password');
    }

    // For demo purposes, allow login with any email that matches the pattern
    if (email.includes('@example.com')) {
      const user = {
        uid: Date.now().toString(),
        email,
        displayName: email.split('@')[0],
        emailVerified: true,
        createdAt: new Date().toISOString()
      };
      mockUsers.set(email, { user, password });
      this.currentUser = user;
      return { user };
    }
    
    const userAccount = mockUsers.get(email);
    if (!userAccount) {
      throw new Error('auth/user-not-found');
    }

    if (userAccount.password !== password) {
      throw new Error('auth/wrong-password');
    }

    this.currentUser = userAccount.user;
    return { user: userAccount.user };
  },

  async signOut() {
    this.currentUser = null;
  },

  async getIdToken() {
    if (!this.currentUser) {
      throw new Error('auth/not-authenticated');
    }
    return `mock-token-${this.currentUser.uid}`;
  }
};