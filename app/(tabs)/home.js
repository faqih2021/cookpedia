import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Box, Text, Pressable, HStack, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import Categories from '../../components/home/categories';
import Recommendation from '../../components/home/recommendation';
import RecipeOfTheDay from '../../components/home/recipeOfTheDay';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '../../components/ui/skeleton';
import { ImageOff } from 'lucide-react-native';

// Component untuk menampilkan gambar dengan error handling
function ImageWithFallback({ source, style, fallbackText = "Image not found" }) {
  const [error, setError] = useState(false);

  if (error || !source?.uri) {
    return (
      <Box 
        style={[style, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}
      >
        <ImageOff size={24} color="#9CA3AF" />
        <Text fontSize="$xs" color="$coolGray400" mt="$1" textAlign="center">
          {fallbackText}
        </Text>
      </Box>
    );
  }

  return (
    <Image 
      source={source}
      style={style}
      onError={() => setError(true)}
    />
  );
}

const avatarUri = 'https://i.pravatar.cc/150?img=12';

// Skeleton untuk Home Screen
function HomeSkeleton() {
  return (
    <Box flex={1} bg="white" px="$5" pt="$12">
      {/* Header Skeleton */}
      <HStack justifyContent="space-between" alignItems="center" mb="$6">
        <VStack flex={1} gap="$2">
          <Skeleton 
            variant="rounded" 
            style={{ width: 100, height: 16, borderRadius: 8 }} 
          />
          <Skeleton 
            variant="rounded" 
            style={{ width: 220, height: 28, borderRadius: 8 }} 
          />
        </VStack>
        <Skeleton 
          variant="circular" 
          style={{ width: 48, height: 48, borderRadius: 24 }} 
        />
      </HStack>

      {/* Categories Skeleton */}
      <Box mb="$5">
        <HStack justifyContent="space-between" alignItems="center" mb="$3">
          <Skeleton 
            variant="rounded" 
            style={{ width: 90, height: 22, borderRadius: 6 }} 
          />
          <Skeleton 
            variant="rounded" 
            style={{ width: 50, height: 16, borderRadius: 6 }} 
          />
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="md">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Box 
                key={item} 
                width={92} 
                height={92} 
                borderRadius={14} 
                justifyContent="center" 
                alignItems="center" 
                bg="$white"
                borderWidth={1}
                borderColor="$coolGray100"
              >
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 8 }} 
                />
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 56, height: 12, borderRadius: 4 }} 
                />
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Recommendation Skeleton */}
      <Box mb="$5">
        <HStack justifyContent="space-between" alignItems="center" mb="$3">
          <Skeleton 
            variant="rounded" 
            style={{ width: 130, height: 22, borderRadius: 6 }} 
          />
          <Skeleton 
            variant="rounded" 
            style={{ width: 50, height: 16, borderRadius: 6 }} 
          />
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="md">
            {[1, 2, 3].map((item) => (
              <Box 
                key={item} 
                width={200} 
                borderRadius={14} 
                overflow="hidden" 
                bg="$white"
                borderWidth={1}
                borderColor="$coolGray100"
              >
                <Box position="relative">
                  <Skeleton 
                    variant="sharp" 
                    style={{ width: '100%', height: 140 }} 
                  />
                  <Box position="absolute" top={8} right={8}>
                    <Skeleton 
                      variant="circular" 
                      style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6' }} 
                    />
                  </Box>
                </Box>
                <VStack p="$3" space="sm">
                  <Skeleton 
                    variant="rounded" 
                    style={{ width: 140, height: 16, borderRadius: 6 }} 
                  />
                  <Skeleton 
                    variant="rounded" 
                    style={{ width: 80, height: 12, borderRadius: 4 }} 
                  />
                </VStack>
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Recipe of the Day Skeleton */}
      <Box mb="$4">
        <Skeleton 
          variant="rounded" 
          style={{ width: 140, height: 22, borderRadius: 6, marginBottom: 12 }} 
        />
        <Box 
          borderRadius={14} 
          overflow="hidden" 
          bg="$white"
          borderWidth={1}
          borderColor="$coolGray100"
        >
          <Box position="relative">
            <Skeleton 
              variant="sharp" 
              style={{ width: '100%', height: 180 }} 
            />
            <Box position="absolute" top={12} right={12}>
              <Skeleton 
                variant="circular" 
                style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6' }} 
              />
            </Box>
          </Box>
          <VStack p="$3" space="sm">
            <Skeleton 
              variant="rounded" 
              style={{ width: 180, height: 18, borderRadius: 6 }} 
            />
            <Skeleton 
              variant="rounded" 
              style={{ width: 100, height: 14, borderRadius: 4 }} 
            />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

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
        <HomeSkeleton />
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
              <ImageWithFallback
                source={{ uri: user?.user_metadata?.avatar_url || avatarUri }}
                style={{ width: 48, height: 48, borderRadius: 24 }}
                fallbackText=""
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

