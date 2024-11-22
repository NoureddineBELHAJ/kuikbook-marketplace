import { createContext, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const ThemeContext = createContext({
  theme: 'public',
  color: '#7C7F86'
});

export function ThemeProvider({ children }) {
  const { user, currentRole, getRoleColor } = useAuth();
  const theme = currentRole?.toLowerCase() || 'public';
  const color = getRoleColor();

  // Apply theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', color);
    root.style.setProperty('--theme-color', color);
  }, [color]);

  return (
    <ThemeContext.Provider value={{ theme, color }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}