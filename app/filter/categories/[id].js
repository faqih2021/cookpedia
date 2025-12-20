import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CATEGORIES, RECOMMENDATIONS } from '../../../datas';

export default function CategoryDetail() {
  const params = useLocalSearchParams();
  const { id } = params;
  const router = useRouter();
  const category = CATEGORIES.find((c) => c.id === id);

  return (
    <Box flex={1} bg="$white" px="$6" py="$10   ">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
        <Text size="lg" fontWeight="$bold">{category ? category.label : 'Category'}</Text>
      </Box>

  <ScrollView showsVerticalScrollIndicator={false}>
        <Box borderRadius={14} overflow="hidden" mb="$4">
          <Image source={category ? category.icon : require('../../../assets/breakfast.png')} style={{ width: '100%', height: 200, resizeMode: 'cover' }} />
        </Box>
        <Text color="$coolGray600" mb="$4">{category ? category.description : ''}</Text>

        <Text fontWeight="$bold" mb="$2">Popular in {category ? category.label : 'Category'}</Text>
        {category && (
          <Box>
            {RECOMMENDATIONS.filter((r) => r.category === category.id).map((item) => (
              <TouchableOpacity key={item.id} onPress={() => router.push(`/filter/recipes/${item.id}`)} activeOpacity={0.9}>
                <Box flexDirection="row" mb="$3" alignItems="center">
                  <Image source={item.image} style={{ width: 96, height: 72, borderRadius: 8, marginRight: 12 }} />
                  <Box flex={1}>
                    <Text fontWeight="$bold">{item.title}</Text>
                    <Text color="$coolGray400" mt="$1">{item.by}</Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

