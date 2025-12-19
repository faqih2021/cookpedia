import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function RecipeOfTheDay() {
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Box mb="$4" justifyContent="center" alignItems="center" height={250}>
        <ActivityIndicator size="large" color="#00A86B" />
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
        onPress={() => meal?.idMeal && router.push(`/recipes/${meal.idMeal}`)}
      >
        <Box width="100%" borderRadius={14} bg="$white" overflow="hidden">
          <Image 
            source={meal?.strMealThumb ? { uri: meal.strMealThumb } : require('../../assets/ayam-goreng.jpeg')} 
            style={{ width: '100%', height: 180, resizeMode: 'cover' }} 
          />
          <Box px="$3" py="$3">
            <Text fontWeight="$bold">{meal?.strMeal || 'Recipe of the Day'}</Text>
            {meal?.strCategory ? <Text color="$coolGray400" mt="$1">{meal.strCategory}</Text> : null}
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}


