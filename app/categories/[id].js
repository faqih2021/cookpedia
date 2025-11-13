import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { DEFAULT_CATEGORIES } from '../../components/categories';

export default function CategoryDetail() {
  const params = useLocalSearchParams();
  const { id } = params;
  const category = DEFAULT_CATEGORIES.find((c) => c.id === id);

  return (
    <Box flex={1} bg="$white" px="$6" py="$10   ">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
        <Text size="lg" fontWeight="$bold">{category ? category.label : 'Category'}</Text>
      </Box>

      <ScrollView>
        {/* Placeholder content: show a big image and sample items */}
        <Box borderRadius={14} overflow="hidden" mb="$4">
          <Image source={category ? category.icon : require('../../assets/breakfast.png')} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
        </Box>

        <Text fontWeight="$bold" mb="$2">Popular in {category ? category.label : 'Category'}</Text>
        {/* Add recipe list here */}
      </ScrollView>
    </Box>
  );
}
