import React, { useEffect, useState } from 'react';
import { Pressable, Image, ScrollView } from 'react-native';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFavorites } from '../../../context/FavoritesContext';
import { Skeleton } from '../../../components/ui/skeleton';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = async () => {
    if (recipe) {
      await toggleFavorite({
        id: recipe.id,
        title: recipe.title,
        by: recipe.by,
        image: recipe.image.uri || recipe.image
      });
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await res.json();
        const meal = json?.meals?.[0];
        if (meal) {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ing && ing.trim()) {
              ingredients.push(`${measure?.trim() || ''} ${ing.trim()}`.trim());
            }
          }

          const rawSteps = meal.strInstructions
            ? meal.strInstructions.split(/\r?\n/).filter(s => s.trim())
            : [];
          
          const steps = rawSteps.map(s => 
            s.replace(/^(STEP\s*)?\d+\.?\s*/i, '').trim()
          ).filter(s => s.length > 0);

          setRecipe({
            id: meal.idMeal,
            title: meal.strMeal,
            by: meal.strCategory || 'Unknown',
            image: { uri: meal.strMealThumb },
            ingredients,
            steps
          });
        }
      } catch (e) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Box flex={1} bg="white" px="$6" pt="$10">
        {/* Header Skeleton */}
        <HStack alignItems="center" mb="$4" justifyContent="space-between">
          <HStack alignItems="center" flex={1}>
            <Skeleton variant="circular" className="h-10 w-10 mr-3" startColor="bg-gray-200" />
            <Skeleton variant="rounded" className="h-6 w-48" startColor="bg-gray-200" />
          </HStack>
          <Skeleton variant="circular" className="h-10 w-10" startColor="bg-gray-200" />
        </HStack>

        {/* Image Skeleton */}
        <Skeleton variant="rounded" className="h-56 w-full mb-3" startColor="bg-gray-200" />

        {/* Title & Category Skeleton */}
        <Skeleton variant="rounded" className="h-6 w-40 mb-2" startColor="bg-gray-200" />
        <Skeleton variant="rounded" className="h-4 w-24 mb-6" startColor="bg-gray-200" />

        {/* Ingredients Skeleton */}
        <Skeleton variant="rounded" className="h-5 w-28 mb-3" startColor="bg-gray-200" />
        <VStack space="sm" mb="$6">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant="rounded" className="h-4 w-full" startColor="bg-gray-200" />
          ))}
        </VStack>

        {/* Steps Skeleton */}
        <Skeleton variant="rounded" className="h-5 w-20 mb-3" startColor="bg-gray-200" />
        <VStack space="md">
          {[1, 2, 3].map((item) => (
            <HStack key={item} space="md" alignItems="flex-start">
              <Skeleton variant="circular" className="h-7 w-7" startColor="bg-gray-200" />
              <VStack flex={1} space="xs">
                <Skeleton variant="rounded" className="h-4 w-full" startColor="bg-gray-200" />
                <Skeleton variant="rounded" className="h-4 w-3/4" startColor="bg-gray-200" />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Box flex={1} bg="$white" px="$4" py="$6" justifyContent="center" alignItems="center">
        <Text>Recipe not found</Text>
      </Box>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 40 }}>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb="$4">
        <Box flexDirection="row" alignItems="center" flex={1}>
          <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text fontWeight="$bold" size="xl" numberOfLines={1} flex={1}>{recipe.title}</Text>
        </Box>
        
        {/* Favorite Button */}
        <Pressable 
          onPress={handleToggleFavorite}
          style={{ 
            padding: 8, 
            backgroundColor: isFavorite(recipe.id) ? '#FFF0F0' : '#F5F5F5',
            borderRadius: 20
          }}
        >
          <Heart 
            size={24} 
            color={isFavorite(recipe.id) ? '#FF4757' : '#666'} 
            fill={isFavorite(recipe.id) ? '#FF4757' : 'transparent'} 
          />
        </Pressable>
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

      <Box mb="$6">
        <Text fontWeight="$bold" size="lg" mb="$3">Steps</Text>
        {recipe.steps && recipe.steps.map((s, idx) => (
          <Box key={idx} flexDirection="row" mb="$4">
            <Box 
              width={28} 
              height={28} 
              borderRadius={14} 
              bg="#00A86B" 
              justifyContent="center" 
              alignItems="center"
              mr="$3"
              mt="$0.5"
            >
              <Text color="white" fontWeight="$bold" fontSize="$sm">{idx + 1}</Text>
            </Box>
            <Box flex={1}>
              <Text lineHeight={22} color="$coolGray700">{s}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </ScrollView>
  );
}

