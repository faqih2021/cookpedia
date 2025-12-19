import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import Categories from '../../components/home/categories';
import Recommendation from '../../components/home/recommendation';
import RecipeOfTheDay from '../../components/home/recipeOfTheDay';
import { CATEGORIES, RECOMMENDATIONS } from '../../datas';


export default function HomeScreen({
  heading = 'What would you like to cook today?',
  selectedCategory = 'breakfast',
  onSelectCategory = () => {},
} = {}) {
  const router = useRouter();
  
  const [user, setUser] = useState({
    name: 'Kiki Anderson',
    avatarUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  });

  const handleAvatarPress = () => {
    router.push('/profile');
  };

  return (
    <Box flex={1} bg="white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
          <Box width="80%">
            <Text color="$coolGray500" py="$1">Hello, {user.name}</Text>
            <Text size="2xl" fontWeight="$bold">{heading}</Text>
          </Box>

          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.8}>
            <Image
              source={{ uri: user.avatarUri }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
          </TouchableOpacity>
        </Box>

        <Categories categories={CATEGORIES.slice(0, 4)} selected={selectedCategory} onSelect={onSelectCategory} />

        <Recommendation items={RECOMMENDATIONS.slice(0, 4)} />

        <RecipeOfTheDay/>

      </ScrollView>
    </Box>
  );
}

