import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

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
      <Box flex={1} bg="$white" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00A86B" />
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" alignItems="center" mb="$4" gap="$3">
        <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text size="lg" fontWeight="$bold">All Recommendations</Text>
        <Text color="#00A86B" ml="$2">{recommendations.length} items</Text>
      </Box>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={recommendations}
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



