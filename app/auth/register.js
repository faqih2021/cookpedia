import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import {
  AuthInput,
  AuthButton,
  AuthLink,
  AuthHeader,
  AuthError,
  SuccessModal,
  BackButton,
  PasswordRequirements,
  COLORS,
} from '../../components/auth/authComponents';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Sign up dengan Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            avatar_url: null,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data?.user) {
        // Cek apakah email perlu konfirmasi
        if (data.user.identities && data.user.identities.length === 0) {
          setError('An account with this email already exists.');
        } else if (data.session) {
          // Jika auto-confirm aktif
          setSuccessMessage('Your account has been created successfully! You can now login with your credentials.');
          setShowSuccessModal(true);
        } else {
          // Email konfirmasi diperlukan
          setSuccessMessage('Registration successful! Please check your email to verify your account before logging in.');
          setShowSuccessModal(true);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message.includes('already registered')) {
        setError('This email is already registered. Please try logging in.');
      } else {
        setError(err.message || 'Failed to register. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.replace('/auth/login');
  };

  const handleNavigateToLogin = () => {
    router.push('/auth/login');
  };

  const handleBack = () => {
    router.back();
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
            paddingTop: 50,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <BackButton onPress={handleBack} />

          <AuthHeader
            title="Create Account"
            subtitle="Join Cookpedia and discover thousands of delicious recipes"
          />

          <AuthError message={error} onDismiss={() => setError('')} />

          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            autoCapitalize="words"
            icon="user"
            error={errors.fullName}
          />

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
            placeholder="Create a password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            secureTextEntry
            icon="lock"
            error={errors.password}
          />

          <AuthInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            secureTextEntry
            icon="lock"
            error={errors.confirmPassword}
          />

          <PasswordRequirements password={password} />

          <AuthButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            disabled={!fullName || !email || !password || !confirmPassword}
          />

          <AuthLink
            text="Already have an account?"
            linkText="Sign In"
            onPress={handleNavigateToLogin}
          />

          {/* Terms and Privacy */}
          <Box mt="$4" style={{ alignItems: 'center' }}>
            <Text fontSize="$xs" color="$coolGray400" textAlign="center">
              By signing up, you agree to our{' '}
              <Text fontSize="$xs" color={COLORS.primary}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text fontSize="$xs" color={COLORS.primary}>
                Privacy Policy
              </Text>
            </Text>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Registration Successful! 🎉"
        message={successMessage}
        buttonText="Go to Login"
        onButtonPress={handleSuccessModalClose}
      />
    </Box>
  );
}
