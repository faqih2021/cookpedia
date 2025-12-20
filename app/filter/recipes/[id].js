import React, { useEffect, useState } from 'react';
import { Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Box flex={1} bg="$white" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00A86B" />
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
      <Box flexDirection="row" alignItems="center" mb="$4">
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
                      <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text fontWeight="$bold" size="xl" numberOfLines={1} flex={1}>{recipe.title}</Text>
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

