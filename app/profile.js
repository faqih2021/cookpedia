import React, { useState } from 'react';
import { Image, ScrollView, Alert } from 'react-native';
import { Box, Text, VStack, HStack, Pressable } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  LogOut, 
  Heart, 
  Trash2, 
  Settings,
  ChevronRight,
  UserCircle
} from 'lucide-react-native';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../context/FavoritesContext';
import { LogoutModal, COLORS } from '../components/auth/authComponents';

const avatarUri = 'https://i.pravatar.cc/150?img=12';

// Menu Item Component
function MenuItem({ icon: Icon, label, onPress, showChevron = true, danger = false }) {
  const iconColor = danger ? '#EF4444' : '#6B7280';
  const textColor = danger ? '#EF4444' : '#1F2937';
  
  return (
    <Pressable
      onPress={onPress}
      bg="$white"
      py="$4"
      px="$4"
      $active={{ bg: '$coolGray50' }}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="md">
          <Box
            w={40}
            h={40}
            borderRadius={10}
            bg={danger ? '#FEE2E2' : '$coolGray100'}
            justifyContent="center"
            alignItems="center"
          >
            <Icon size={20} color={iconColor} />
          </Box>
          <Text fontWeight="$medium" color={textColor} fontSize="$md">
            {label}
          </Text>
        </HStack>
        {showChevron && <ChevronRight size={20} color="#9CA3AF" />}
      </HStack>
    </Pressable>
  );
}

// Section Divider
function SectionDivider() {
  return <Box h={1} bg="$coolGray100" />;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { favorites, clearFavorites } = useFavorites();
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

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will remove all your favorite recipes. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearFavorites();
            Alert.alert('Success', 'Cache cleared successfully!');
          },
        },
      ]
    );
  };

  const handleFavorites = () => {
    router.push('/(tabs)/favorite');
  };

  const handleEditProfile = () => {
    router.push('/editProfile');
  };

  return (
    <Box flex={1} bg="#F9FAFB">
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <Box px="$5" pt="$2" pb="$4">
          <HStack alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => router.back()} p="$2">
              <ArrowLeft size={24} color="#1F2937" />
            </Pressable>
            <Text size="lg" fontWeight="$bold" color="$coolGray800">
              My Profile
            </Text>
            <Box w={40} />
          </HStack>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <Box px="$5" mb="$6">
            <Box 
              bg="$white" 
              borderRadius={20} 
              p="$6"
              alignItems="center"
              shadowColor="$coolGray300"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              {/* Avatar */}
              <Box position="relative">
                <Image
                  source={{ uri: userAvatar }}
                  style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: COLORS.primary
                  }}
                />
              </Box>
              
              {/* User Info */}
              <Text color="$coolGray800" size="xl" fontWeight="$bold" mt="$3">
                {userName}
              </Text>
              <Text color="$coolGray500" mt="$1" fontSize="$sm">
                {userEmail}
              </Text>

              {/* Edit Profile Button */}
              <Pressable
                onPress={handleEditProfile}
                bg={COLORS.primary}
                px="$6"
                py="$2"
                borderRadius={20}
                mt="$4"
                $active={{ bg: COLORS.primaryDark }}
              >
                <Text color="$white" fontWeight="$semibold" fontSize="$sm">
                  Edit Profile
                </Text>
              </Pressable>
            </Box>
          </Box>

          {/* Menu Items */}
          <Box px="$5">
            <Box 
              bg="$white" 
              borderRadius={16} 
              overflow="hidden"
              shadowColor="$coolGray300"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={2}
            >
              {/* Favorites */}
              <MenuItem 
                icon={Heart} 
                label={`Favorites (${favorites.length})`}
                onPress={handleFavorites}
              />
              <SectionDivider />
              
              {/* Clear Cache */}
              <MenuItem 
                icon={Trash2} 
                label="Clear Cache"
                onPress={handleClearCache}
              />
            </Box>
          </Box>

          {/* Logout Section */}
          <Box px="$5" mt="$6">
            <Box 
              bg="$white" 
              borderRadius={16} 
              overflow="hidden"
              shadowColor="$coolGray300"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={2}
            >
              <MenuItem 
                icon={LogOut} 
                label="Log Out"
                onPress={handleLogoutPress}
                showChevron={false}
                danger
              />
            </Box>
          </Box>

          {/* App Version */}
          <Box alignItems="center" mt="$8" mb="$6">
            <Text color="$coolGray400" fontSize="$xs">
              App Version 1.0.0
            </Text>
          </Box>
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
