import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { RECIPE_OF_THE_DAY } from '../../datas';

export default function RecipeOfTheDay() {
  return (
    <TouchableOpacity activeOpacity={0.95}>
      <Box mb="$4">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$2">
          <Text size="lg" fontWeight="$bold">Recipe Of The Day</Text>
        </Box>

        <Box width="100%" borderRadius={14} bg="$white" overflow="hidden">
          <Image
            source={RECIPE_OF_THE_DAY?.image || require('../../assets/ayam-goreng.jpeg')}
            style={{ width: '100%', height: 180, resizeMode: 'cover' }}
          />

          <Box px="$3" py="$3">
            <Text fontWeight="$bold">{RECIPE_OF_THE_DAY?.title || 'Recipe of the Day'}</Text>
            {RECIPE_OF_THE_DAY?.by ? <Text color="$coolGray400" mt="$1">{RECIPE_OF_THE_DAY?.by}</Text> : null}
          </Box>

        </Box>
      </Box>
    </TouchableOpacity>
  );
}


