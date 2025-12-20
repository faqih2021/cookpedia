import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { LogOut } from 'lucide-react-native';
import Categories from '../../components/home/categories';
import Recommendation from '../../components/home/recommendation';
import RecipeOfTheDay from '../../components/home/recipeOfTheDay';
import { CATEGORIES, RECOMMENDATIONS } from '../../datas';
import { useAuth } from '../../hooks/useAuth';
import { LogoutModal } from '../../components/auth/authComponents';

export default function HomeScreen({
  heading = 'What would you like to cook today?',
  avatarUri = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  selectedCategory = 'breakfast',
  onSelectCategory = () => {},
} = {}) {
  const { user, signOut } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Get user name from metadata or email
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Chef';

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
    <Box flex={1} bg="white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
          <Box width="70%">
            <Text color="$coolGray500" py="$1">Hello, {userName}</Text>
            <Text size="2xl" fontWeight="$bold">{heading}</Text>
          </Box>

          <Box flexDirection="row" alignItems="center">
            <Pressable
              onPress={handleLogoutPress}
              mr="$3"
              w={40}
              h={40}
              borderRadius={20}
              bg="#FEE2E2"
              justifyContent="center"
              alignItems="center"
              $active={{
                bg: '#FECACA',
              }}
            >
              <LogOut size={18} color="#EF4444" />
            </Pressable>
            
            <Image
              source={{ uri: user?.user_metadata?.avatar_url || avatarUri }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
          </Box>
        </Box>

        <Categories categories={CATEGORIES.slice(0, 4)} selected={selectedCategory} onSelect={onSelectCategory} />

        <Recommendation items={RECOMMENDATIONS.slice(0, 4)} />

        <RecipeOfTheDay/>

      </ScrollView>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        loading={logoutLoading}
      />
    </Box>
  );
}

