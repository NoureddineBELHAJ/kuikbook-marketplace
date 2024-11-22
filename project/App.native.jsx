import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initErrorMonitoring } from './src/services/errorMonitoring';
import ErrorBoundary from './src/components/ErrorBoundary';

// Screens
import Home from './src/pages/Home';
import Activities from './src/pages/Activities';
import ActivityDetails from './src/pages/ActivityDetails';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Profile from './src/pages/Profile';

// Initialize services
initErrorMonitoring();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Activities" component={Activities} />
                  <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Profile" component={Profile} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}