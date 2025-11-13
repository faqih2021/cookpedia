import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

export default function RecipeOfTheDay({ image, title, by, onPress }) {
  const defaultImage = require('../assets/ayam-goreng.jpeg');

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <Box mb="$4">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$2">
          <Text size="lg" fontWeight="$bold">Recipes Of The Day</Text>
        </Box>

        <Box width="100%" borderRadius={14} bg="$white" overflow="hidden">
          <Image
            source={image || defaultImage}
            style={{ width: '100%', height: 180, resizeMode: 'cover' }}
          />

        </Box>
      </Box>
    </TouchableOpacity>
  );
}
