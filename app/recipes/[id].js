import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DEFAULT_RECOMMENDATIONS } from '../../components/recommendation';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = DEFAULT_RECOMMENDATIONS.find((r) => r.id === id);

  if (!recipe) {
    return (
      <Box flex={1} bg="$white" px="$4" py="$6" justifyContent="center" alignItems="center">
        <Text>Recipe not found</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$6" py="$10">
      <Box flexDirection="row" alignItems="center" mb="$4">
        <Text fontWeight="$bold" ml="$3">{recipe.title}</Text>
      </Box>

      <Image source={recipe.image} style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 12 }} />

      <Text fontWeight="$bold">{recipe.title}</Text>
      <Text color="$coolGray400" mb="$3">{recipe.by}</Text>

      <Text>Apanih Resepnya</Text>
    </Box>
  );
}
