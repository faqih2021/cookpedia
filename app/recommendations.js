import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { DEFAULT_RECOMMENDATIONS } from '../components/recommendation';
import { useRouter } from 'expo-router';

export default function AllRecommendations() {
  const router = useRouter();

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
        <Text size="lg" fontWeight="$bold">All Recommendations</Text>
        <Text color="#00A86B">{DEFAULT_RECOMMENDATIONS.length} items</Text>
      </Box>

      <FlatList
        data={DEFAULT_RECOMMENDATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/recipes/${item.id}`)} activeOpacity={0.9}>
            <Box flexDirection="row" mb="$3" alignItems="center">
              <Image source={item.image} style={{ width: 96, height: 72, borderRadius: 8, marginRight: 12 }} />
              <Box flex={1}>
                <Text fontWeight="$bold">{item.title}</Text>
                <Text color="$coolGray400" mt="$1">{item.by}</Text>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  );
}
