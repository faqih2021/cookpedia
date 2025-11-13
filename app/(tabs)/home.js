import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import Categories from '../../components/categories';
import Recommendation from '../../components/recommendation';
import RecipeOfTheDay from '../../components/recipeOfTheDay';


export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');

  return (
    <Box flex={1} bg="white">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
        <Box width="80%">
          <Text color="$coolGray500" py="$1">Hello, Kiki</Text>
          <Text size="2xl" fontWeight="$bold">What would you like to cook today?</Text>
        </Box>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />

      </Box>

        {/* Search placeholder (keep or replace with SearchBar component) */}
        <Box mb="$4">
          <Text color="$coolGray500">Search Bar</Text>
        </Box>

        {/* Categories component */}
        <Categories selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Recommendation component */}
        <Recommendation />

        {/* Recipe of the Day */}
        <RecipeOfTheDay />

      </ScrollView>
    </Box>
  );
}