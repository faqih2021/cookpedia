import React from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { CATEGORIES } from '../datas';
import { useRouter } from 'expo-router';

export default function AllCategories() {
  const router = useRouter();

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
        <Text size="lg" fontWeight="$bold">All Categories</Text>
        <Text color="#00A86B">{CATEGORIES.length} items</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => router.push(`/categories/${c.id}`)} activeOpacity={0.85} style={{ marginBottom: 12 }}>
              <Box width={160} height={120} borderRadius={12} bg="$white" borderWidth={1} borderColor="$coolGray200" justifyContent="center" alignItems="center">
                <Image source={c.icon} style={{ width: 64, height: 64, resizeMode: 'contain', marginBottom: 8 }} />
                <Text fontWeight="$bold">{c.label}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
