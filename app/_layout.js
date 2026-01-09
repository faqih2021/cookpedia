import { useEffect, useCallback } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { FavoritesProvider } from '../context/FavoritesContext';
import { View, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { session, loading, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Hide splash screen with delay
  const hideSplash = useCallback(async () => {
    if (initialized) {
      // Delay splash screen for 3 seconds (3000ms)
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }
  }, [initialized]);

  useEffect(() => {
    hideSplash();
  }, [hideSplash]);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/auth/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace('/(tabs)/home');
    }
  }, [session, segments, initialized]);

  // Show loading spinner while checking auth
  if (!initialized || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="editProfile" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <FavoritesProvider>
          <RootLayoutNav />
        </FavoritesProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}