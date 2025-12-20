import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import Categories from '../../components/home/categories';
import Recommendation from '../../components/home/recommendation';
import RecipeOfTheDay from '../../components/home/recipeOfTheDay';
import { useAuth } from '../../hooks/useAuth';

const avatarUri = 'https://i.pravatar.cc/150?img=12';

export default function HomeScreen({
  heading = 'What would you like to cook today?',
  selectedCategory = 'beef',
  onSelectCategory = () => {},
} = {}) {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const catJson = await catRes.json();
        const cats = (catJson?.categories || []).slice(0, 4).map(c => ({
          id: c.strCategory.toLowerCase(),
          label: c.strCategory,
          icon: { uri: c.strCategoryThumb }
        }));
        setCategories(cats);

        const recPromises = [];
        for (let i = 0; i < 4; i++) {
          recPromises.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php'));
        }
        const recResponses = await Promise.all(recPromises);
        const recJsons = await Promise.all(recResponses.map(r => r.json()));
        const recs = recJsons.map(json => {
          const meal = json?.meals?.[0];
          return meal ? {
            id: meal.idMeal,
            title: meal.strMeal,
            by: meal.strArea ? `${meal.strArea} Cuisine` : 'TheMealDB',
            image: { uri: meal.strMealThumb }
          } : null;
        }).filter(Boolean);
        setRecommendations(recs);
      } catch (e) {
        console.error('Error fetching home data:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Chef';

  return (
    <Box flex={1} bg="white">
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#00A86B" />
        </Box>
      ) : (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
          <Box width="70%">
            <Text color="$coolGray500" py="$1">Hello, {userName}</Text>
            <Text size="2xl" fontWeight="$bold">{heading}</Text>
          </Box>

          <Box flexDirection="row" alignItems="center">
            <Pressable
              onPress={() => router.push('/profile')}
            >
              <Image
                source={{ uri: user?.user_metadata?.avatar_url || avatarUri }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
            </Pressable>
          </Box>
        </Box>

        <Categories categories={categories} selected={selectedCategory} onSelect={onSelectCategory} />

        <Recommendation items={recommendations} />

        <RecipeOfTheDay/>

      </ScrollView>
      )}
    </Box>
  );
}

