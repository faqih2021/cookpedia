import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { RECOMMENDATIONS } from '../../../datas';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const recipe = RECOMMENDATIONS.find((r) => r.id === id);

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

      <Box mb="$4">
        <Text fontWeight="$bold" mb="$2">Ingredients</Text>
        {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
          <Text key={idx} mb="$1">- {ing}</Text>
        ))}
      </Box>

      <Box>
        <Text fontWeight="$bold" mb="$2">Steps</Text>
        {recipe.steps && recipe.steps.map((s, idx) => (
          <Text key={idx} mb="$1">{idx + 1}. {s}</Text>
        ))}
      </Box>
    </Box>
  );
}

