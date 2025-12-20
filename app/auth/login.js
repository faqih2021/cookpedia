import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import {
  AuthInput,
  AuthButton,
  AuthLink,
  AuthHeader,
  AuthLogo,
  AuthError,
  RememberMeCheckbox,
  COLORS,
} from '../../components/auth/authComponents';

const REMEMBER_ME_KEY = '@cookpedia_remember_me';
const SAVED_EMAIL_KEY = '@cookpedia_saved_email';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedRememberMe = await AsyncStorage.getItem(REMEMBER_ME_KEY);
      if (savedRememberMe === 'true') {
        setRememberMe(true);
        const savedEmail = await AsyncStorage.getItem(SAVED_EMAIL_KEY);
        if (savedEmail) {
          setEmail(savedEmail);
        }
      }
    } catch (err) {
      console.error('Error loading saved credentials:', err);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem(REMEMBER_ME_KEY, 'true');
        await AsyncStorage.setItem(SAVED_EMAIL_KEY, email.trim());
      } else {
        await AsyncStorage.removeItem(REMEMBER_ME_KEY);
        await AsyncStorage.removeItem(SAVED_EMAIL_KEY);
      }
    } catch (err) {
      console.error('Error saving credentials:', err);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.user) {
        // Save credentials if remember me is checked
        await saveCredentials();
        // Login berhasil, navigasi ke home
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/auth/register');
  };

  return (
    <Box flex={1} bg={COLORS.white}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthLogo />

          <AuthHeader
            title="Welcome Back! 👋"
            subtitle="Sign in to continue exploring delicious recipes"
          />

          <AuthError message={error} onDismiss={() => setError('')} />

          <AuthInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
            error={errors.email}
          />

          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            secureTextEntry
            icon="lock"
            error={errors.password}
          />

          <RememberMeCheckbox
            isChecked={rememberMe}
            onChange={(checked) => setRememberMe(checked)}
          />

          <AuthButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            disabled={!email || !password}
          />

          <AuthLink
            text="Don't have an account?"
            linkText="Sign Up"
            onPress={handleNavigateToRegister}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
