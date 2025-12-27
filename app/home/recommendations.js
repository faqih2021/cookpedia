import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Skeleton } from '../../components/ui/skeleton';

export default function AllRecommendations() {
  const router = useRouter();
  const { items: itemsParam } = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itemsParam) {
      try {
        const parsed = JSON.parse(itemsParam);
        setRecommendations(parsed);
        setLoading(false);
        return;
      } catch (e) {
      }
    }

    const fetchRecommendations = async () => {
      try {
        const promises = Array(10).fill(null).map(() =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
        );
        const results = await Promise.all(promises);
        const meals = results
          .map(r => r?.meals?.[0])
          .filter(Boolean)
          .map(meal => ({
            id: meal.idMeal,
            title: meal.strMeal,
            by: meal.strCategory || 'Unknown',
            image: { uri: meal.strMealThumb }
          }));
        setRecommendations(meals);
      } catch (e) {
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [itemsParam]);

  if (loading) {
    return (
      <Box flex={1} bg="$white" px="$4" py="$12">
        <HStack alignItems="center" justifyContent="space-between" mb="$4">
          <HStack alignItems="center">
            <Skeleton variant="circular" className="h-10 w-10 mr-2" startColor="bg-gray-200" />
            <Skeleton variant="rounded" className="h-6 w-40" startColor="bg-gray-200" />
          </HStack>
          <Skeleton variant="rounded" className="h-4 w-16" startColor="bg-gray-200" />
        </HStack>
        
        <VStack space="md">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <HStack key={item} space="md" alignItems="center">
              <Skeleton variant="rounded" className="h-[72px] w-24" startColor="bg-gray-200" style={{ borderRadius: 8 }} />
              <VStack flex={1} space="sm">
                <Skeleton variant="rounded" className="h-5 w-full" startColor="bg-gray-200" />
                <Skeleton variant="rounded" className="h-3 w-20" startColor="bg-gray-200" />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb="$4">
        <Box flexDirection="row" alignItems="center">
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text size="lg" fontWeight="$bold" ml="$2">All Recommendations</Text>
        </Box>
        <Text color="#00A86B" fontWeight="$medium">{recommendations.length} items</Text>
      </Box>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/filter/recipes/${item.id}`)} activeOpacity={0.9}>
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



