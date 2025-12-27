import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Text, Pressable, VStack, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Heart, ImageOff } from 'lucide-react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { Skeleton } from '../ui/skeleton';

// Component untuk menampilkan gambar dengan error handling
function RecipeImage({ source, style, fallbackImage }) {
  const [error, setError] = useState(false);

  if (error && fallbackImage) {
    return <Image source={fallbackImage} style={style} />;
  }

  if (error || !source?.uri) {
    return (
      <Box style={[style, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
        <ImageOff size={32} color="#9CA3AF" />
        <Text fontSize="$sm" color="$coolGray400" mt="$2">
          Image not found
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

export default function RecipeOfTheDay() {
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (meal) {
      await toggleFavorite({
        id: meal.idMeal,
        title: meal.strMeal,
        by: meal.strCategory || 'Unknown',
        image: meal.strMealThumb
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMeal = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const json = await res.json();
        if (isMounted && json?.meals?.[0]) {
          setMeal(json.meals[0]);
        }
      } catch (e) {
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMeal();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <Box mb="$4">
        <HStack justifyContent="space-between" alignItems="center" mb="$2">
          <Skeleton 
            variant="rounded" 
            style={{ width: 140, height: 22, borderRadius: 6 }} 
          />
        </HStack>
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
    );
  }

  return (
    <Box mb="$4">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$2">
        <Text size="lg" fontWeight="$bold">Recipe Of The Day</Text>
      </Box>

      <TouchableOpacity 
        activeOpacity={0.95} 
        onPress={() => meal?.idMeal && router.push(`/filter/recipes/${meal.idMeal}`)}
      >
        <Box width="100%" borderRadius={14} bg="$white" overflow="hidden">
          <Box position="relative">
            <RecipeImage 
              source={meal?.strMealThumb ? { uri: meal.strMealThumb } : null} 
              style={{ width: '100%', height: 180, resizeMode: 'cover' }}
              fallbackImage={require('../../assets/ayam-goreng.jpeg')}
            />
            {/* Favorite Button */}
            <Pressable
              onPress={handleToggleFavorite}
              position="absolute"
              top="$3"
              right="$3"
              bg="white"
              p="$2"
              borderRadius="$full"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.2}
              shadowRadius={4}
              elevation={3}
            >
              <Heart 
                size={22} 
                color={meal && isFavorite(meal.idMeal) ? '#FF4757' : '#666'} 
                fill={meal && isFavorite(meal.idMeal) ? '#FF4757' : 'transparent'} 
              />
            </Pressable>
          </Box>
          <Box px="$3" py="$3">
            <Text fontWeight="$bold">{meal?.strMeal || 'Recipe of the Day'}</Text>
            {meal?.strCategory ? <Text color="$coolGray400" mt="$1">{meal.strCategory}</Text> : null}
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}


