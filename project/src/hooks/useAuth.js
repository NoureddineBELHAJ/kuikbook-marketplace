import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, ADMIN_EMAIL, isAdmin } from '../config/firebase';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isAdmin(user)) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (email !== ADMIN_EMAIL) {
      toast.error('Invalid user');
      return;
    }

    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdmin(result.user)) {
        await signOut(auth);
        toast.error('Unauthorized access');
        return;
      }
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: !!user && isAdmin(user)
  };
}