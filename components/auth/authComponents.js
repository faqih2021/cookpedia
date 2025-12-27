import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Box,
  Text,
  Pressable,
  Input,
  InputField,
  InputSlot,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
  ModalFooter,
  Heading,
  Button,
  ButtonText,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
} from '@gluestack-ui/themed';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, LogOut, ChevronLeft } from 'lucide-react-native';

// Warna tema aplikasi
export const COLORS = {
  primary: '#10B981',
  primaryDark: '#059669',
  primaryLight: '#34D399',
  white: '#FFFFFF',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray800: '#1F2937',
  error: '#EF4444',
};

// Input Field Component menggunakan Gluestack
export function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry = false,
  icon,
  error,
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const renderIcon = () => {
    const iconColor = isFocused ? COLORS.primary : COLORS.gray400;
    switch (icon) {
      case 'mail':
        return <Mail size={20} color={iconColor} />;
      case 'lock':
        return <Lock size={20} color={iconColor} />;
      case 'user':
        return <User size={20} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <Box mb="$4">
      {label && (
        <Text fontSize="$sm" fontWeight="$medium" color="$coolGray700" mb="$2">
          {label}
        </Text>
      )}
      <Input
        variant="outline"
        size="lg"
        borderRadius={12}
        borderWidth={1.5}
        borderColor={error ? COLORS.error : isFocused ? COLORS.primary : '$coolGray200'}
        bg="$white"
        h={52}
      >
        {icon && (
          <InputSlot pl="$4">
            {renderIcon()}
          </InputSlot>
        )}
        <InputField
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray400}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          fontSize="$md"
          color="$coolGray800"
          px="$3"
        />
        {secureTextEntry && (
          <InputSlot pr="$4" onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? (
              <EyeOff size={20} color={COLORS.gray400} />
            ) : (
              <Eye size={20} color={COLORS.gray400} />
            )}
          </InputSlot>
        )}
      </Input>
      {error && (
        <Text fontSize="$xs" color={COLORS.error} mt="$1">
          {error}
        </Text>
      )}
    </Box>
  );
}

// Primary Button Component menggunakan Gluestack
export function AuthButton({ title, onPress, loading = false, disabled = false, variant = 'solid' }) {
  const isSolid = variant === 'solid';
  
  return (
    <Button
      onPress={onPress}
      isDisabled={loading || disabled}
      size="lg"
      borderRadius={12}
      h={52}
      bg={isSolid ? (loading || disabled ? '$coolGray400' : COLORS.primary) : 'transparent'}
      borderWidth={isSolid ? 0 : 1}
      borderColor={COLORS.primary}
      $active={{
        bg: isSolid ? COLORS.primaryDark : '$coolGray100',
      }}
      shadowColor={isSolid ? COLORS.primary : 'transparent'}
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.3}
      shadowRadius={8}
      elevation={isSolid ? 4 : 0}
    >
      {loading ? (
        <ActivityIndicator color={isSolid ? COLORS.white : COLORS.primary} />
      ) : (
        <ButtonText
          color={isSolid ? '$white' : COLORS.primary}
          fontSize="$md"
          fontWeight="$bold"
        >
          {title}
        </ButtonText>
      )}
    </Button>
  );
}

// Divider with text
export function AuthDivider({ text = 'or' }) {
  return (
    <Box flexDirection="row" alignItems="center" my="$5">
      <Box flex={1} height={1} bg="$coolGray200" />
      <Text mx="$4" color="$coolGray400" fontSize="$sm">
        {text}
      </Text>
      <Box flex={1} height={1} bg="$coolGray200" />
    </Box>
  );
}

// Link Text Component
export function AuthLink({ text, linkText, onPress }) {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" mt="$6">
      <Text color="$coolGray500" fontSize="$sm">
        {text}{' '}
      </Text>
      <Pressable onPress={onPress}>
        <Text color={COLORS.primary} fontSize="$sm" fontWeight="$bold">
          {linkText}
        </Text>
      </Pressable>
    </Box>
  );
}

// Header Component for Auth Screens
export function AuthHeader({ title, subtitle }) {
  return (
    <Box mb="$6">
      <Heading size="2xl" color="$coolGray800" mb="$2">
        {title}
      </Heading>
      {subtitle && (
        <Text fontSize="$md" color="$coolGray500" lineHeight="$lg">
          {subtitle}
        </Text>
      )}
    </Box>
  );
}

// Logo Component
import { Image } from 'react-native';
export function AuthLogo() {
  return (
    <Box mb="$8" style={{ alignItems: 'center' }}>
      <Image
        source={require('../../assets/logoCookpedia.png')}
        style={{ 
          width: 340, 
          height: 340, 
          resizeMode: 'contain',
        }}
      />
      <Text fontSize="$3xl" fontWeight="$bold" color={COLORS.primary} style={{ marginTop: -90 }}>
        Cookpedia
      </Text>
    </Box>
  );
}

// Error Alert Component
export function AuthError({ message, onDismiss }) {
  if (!message) return null;

  return (
    <Pressable onPress={onDismiss}>
      <Box
        bg="#FEE2E2"
        borderRadius={12}
        p="$4"
        mb="$4"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          width={24}
          height={24}
          borderRadius={12}
          bg={COLORS.error}
          justifyContent="center"
          alignItems="center"
          mr="$3"
        >
          <XCircle size={16} color={COLORS.white} />
        </Box>
        <Text flex={1} color={COLORS.error} fontSize="$sm">
          {message}
        </Text>
      </Box>
    </Pressable>
  );
}

// Success Alert Component
export function AuthSuccess({ message, onDismiss }) {
  if (!message) return null;

  return (
    <Pressable onPress={onDismiss}>
      <Box
        bg="#D1FAE5"
        borderRadius={12}
        p="$4"
        mb="$4"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          width={24}
          height={24}
          borderRadius={12}
          bg={COLORS.primary}
          justifyContent="center"
          alignItems="center"
          mr="$3"
        >
          <CheckCircle size={16} color={COLORS.white} />
        </Box>
        <Text flex={1} color={COLORS.primaryDark} fontSize="$sm">
          {message}
        </Text>
      </Box>
    </Pressable>
  );
}

// Remember Me Checkbox Component
export function RememberMeCheckbox({ isChecked, onChange }) {
  return (
    <Box flexDirection="row" alignItems="center" mb="$4">
      <Checkbox
        size="md"
        value="rememberMe"
        isChecked={isChecked}
        onChange={onChange}
        aria-label="Remember me"
      >
        <CheckboxIndicator
          mr="$2"
          borderColor={isChecked ? COLORS.primary : '$coolGray300'}
          bg={isChecked ? COLORS.primary : 'transparent'}
          borderRadius={4}
        >
          <CheckboxIcon as={CheckIcon} color="$white" />
        </CheckboxIndicator>
        <CheckboxLabel color="$coolGray600" fontSize="$sm">
          Remember me
        </CheckboxLabel>
      </Checkbox>
    </Box>
  );
}

// Success Modal Component
export function SuccessModal({ isOpen, onClose, title, message, buttonText = 'Continue', onButtonPress }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent borderRadius={20} mx="$4" bg="$white">
        <ModalBody pt="$6" pb="$4">
          <Box alignItems="center">
            <Box
              width={80}
              height={80}
              borderRadius={40}
              bg="#D1FAE5"
              justifyContent="center"
              alignItems="center"
              mb="$4"
            >
              <CheckCircle size={48} color={COLORS.primary} />
            </Box>
            <Heading size="lg" color="$coolGray800" mb="$2" textAlign="center">
              {title}
            </Heading>
            <Text color="$coolGray500" fontSize="$sm" textAlign="center" lineHeight="$lg">
              {message}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" pb="$6" px="$4">
          <Button
            onPress={onButtonPress || onClose}
            size="lg"
            borderRadius={12}
            bg={COLORS.primary}
            w="$full"
            h={48}
            $active={{
              bg: COLORS.primaryDark,
            }}
          >
            <ButtonText color="$white" fontWeight="$bold">
              {buttonText}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Logout Confirmation Modal Component
export function LogoutModal({ isOpen, onClose, onConfirm, loading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent borderRadius={20} mx="$4" bg="$white">
        <ModalBody pt="$6" pb="$4">
          <Box alignItems="center">
            <Box
              width={80}
              height={80}
              borderRadius={40}
              bg="#FEE2E2"
              justifyContent="center"
              alignItems="center"
              mb="$4"
            >
              <LogOut size={40} color={COLORS.error} />
            </Box>
            <Heading size="lg" color="$coolGray800" mb="$2" textAlign="center">
              Logout
            </Heading>
            <Text color="$coolGray500" fontSize="$sm" textAlign="center" lineHeight="$lg">
              Are you sure you want to logout from your account?
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter flexDirection="row" gap="$3" pb="$6" px="$4">
          <Button
            onPress={onClose}
            size="lg"
            borderRadius={12}
            flex={1}
            variant="outline"
            borderColor="$coolGray300"
            h={48}
            $active={{
              bg: '$coolGray100',
            }}
          >
            <ButtonText color="$coolGray700" fontWeight="$bold">
              Cancel
            </ButtonText>
          </Button>
          <Button
            onPress={onConfirm}
            isDisabled={loading}
            size="lg"
            borderRadius={12}
            flex={1}
            bg={COLORS.error}
            h={48}
            $active={{
              bg: '#DC2626',
            }}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <ButtonText color="$white" fontWeight="$bold">
                Logout
              </ButtonText>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Back Button Component
export function BackButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      w={40}
      h={40}
      borderRadius={12}
      bg="$coolGray100"
      justifyContent="center"
      alignItems="center"
      mb="$5"
      $active={{
        bg: '$coolGray200',
      }}
    >
      <ChevronLeft size={24} color={COLORS.gray800} />
    </Pressable>
  );
}

// Password Requirements Component
export function PasswordRequirements({ password }) {
  const hasMinLength = password.length >= 6;
  
  return (
    <Box mb="$4" p="$3" bg="$coolGray100" borderRadius={10}>
      <Text fontSize="$xs" color="$coolGray600" mb="$1">
        Password requirements:
      </Text>
      <Box flexDirection="row" alignItems="center">
        <Text fontSize="$xs" color={hasMinLength ? COLORS.primary : '$coolGray400'}>
          • At least 6 characters {hasMinLength && '✓'}
        </Text>
      </Box>
    </Box>
  );
}
