import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Box, Text, VStack, HStack, Pressable } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, LogOut, Heart,ChevronRight } from 'lucide-react-native';


export default function ProfileScreen() {
  const router = useRouter();
  
  const [user, setUser] = useState({
    name: 'Kiki Anderson',
    email: 'kiki.anderson@email.com',
    avatarUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    recipesCount: 12,
    favoritesCount: 48
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            router.replace('/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    { icon: Heart, label: 'My Favorites', color: '#FF6B6B', onPress: () => {} },
  ];

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
                source={{ uri: user.avatarUri }}
                style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: 'white'
                }}
              />
              <Text color="white" size="xl" fontWeight="$bold" mt="$3">
                {user.name}
              </Text>
              <Text color="rgba(255,255,255,0.8)" mt="$1">
                {user.email}
              </Text>

              <HStack mt="$4" >
              </HStack>
            </Box>
          </Box>

          {/* Menu Items */}
          <VStack px="$5" space="sm">
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                bg="$white"
                borderRadius={12}
                p="$4"
                borderWidth={1}
                borderColor="$coolGray100"
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" space="md">
                    <Box 
                      width={40} 
                      height={40} 
                      borderRadius={10} 
                      bg={item.color + '20'}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <item.icon size={20} color={item.color} />
                    </Box>
                    <Text fontWeight="$medium" color="$coolGray800">
                      {item.label}
                    </Text>
                  </HStack>
                  <ChevronRight size={20} color="#9CA3AF" />
                </HStack>
              </Pressable>
            ))}

            <Pressable
              onPress={handleLogout}
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
      </SafeAreaView>
    </Box>
  );
}
