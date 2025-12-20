import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Pressable } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, LogOut } from 'lucide-react-native';
import { useAuth } from '../hooks/useAuth';
import { LogoutModal } from '../components/auth/authComponents';

const avatarUri = 'https://i.pravatar.cc/150?img=12';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Chef';
  const userEmail = user?.email || 'user@email.com';
  const userAvatar = user?.user_metadata?.avatar_url || avatarUri;

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLogoutLoading(false);
      setShowLogoutModal(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <Box flex={1} bg="$white">
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <Box px="$5" pt="$2" pb="$4">
          <HStack alignItems="center">
            <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text size="xl" fontWeight="$bold" ml="$3">Profile</Text>
          </HStack>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box px="$5" mb="$6">
            <Box 
              bg="#00A86B" 
              borderRadius={20} 
              p="$5"
              alignItems="center"
            >
              <Image
                source={{ uri: userAvatar }}
                style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: 'white'
                }}
              />
              <Text color="white" size="xl" fontWeight="$bold" mt="$3">
                {userName}
              </Text>
              <Text color="rgba(255,255,255,0.8)" mt="$1">
                {userEmail}
              </Text>

              <HStack mt="$4" >
              </HStack>
            </Box>
          </Box>

          <VStack px="$5" space="sm">

            <Pressable
              onPress={handleLogoutPress}
              bg="$white"
              borderRadius={12}
              p="$4"
              borderWidth={1}
              borderColor="#FF6B6B"
              mt="$4"
            >
              <HStack alignItems="center" justifyContent="center" space="md">
                <LogOut size={20} color="#FF6B6B" />
                <Text fontWeight="$medium" color="#FF6B6B">
                  Logout
                </Text>
              </HStack>
            </Pressable>
          </VStack>

          <Box height={40} />
        </ScrollView>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          loading={logoutLoading}
        />
      </SafeAreaView>
    </Box>
  );
}
