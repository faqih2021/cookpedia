import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  ScrollView,
  Pressable
} from '@gluestack-ui/themed';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../context/FavoritesContext';
import { Skeleton } from '../ui/skeleton';

export default function CategoryFilterResult({ selectedCategory = 'Seafood', onGoBack }) {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = async (recipe, e) => {
    e.stopPropagation();
    await toggleFavorite({
      id: recipe.id,
      title: recipe.name,
      by: selectedCategory,
      image: recipe.image.uri
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!selectedCategory) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        const json = await res.json();
        const meals = (json?.meals || []).map(m => ({
          id: m.idMeal,
          name: m.strMeal,
          image: { uri: m.strMealThumb }
        }));
        setRecipes(meals);
      } catch (e) {
        console.error(e);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  const handleRecipePress = (recipeId) => {
    router.push(`/filter/recipes/${recipeId}`);
  };

  const renderRecipeCard = (recipe) => (
    <Pressable
      key={recipe.id}
      bg="#E8F5E8"
      borderRadius="$2xl"
      px="$4"
      py="$3"
      mb="$3"
      flexDirection="row"
      alignItems="center"
      shadowColor="#000000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
      onPress={() => handleRecipePress(recipe.id)}
    >
      {/* Recipe Image */}
      <Image 
        source={recipe.image}
        style={{ width: 60, height: 60, borderRadius: 12 }}
        resizeMode="cover"
      />
      
      {/* Recipe Name */}
      <Text 
        flex={1} 
        fontWeight="$semibold" 
        size="md" 
        color="$coolGray800" 
        numberOfLines={2}
        ml="$4"
      >
        {recipe.name}
      </Text>
      
      {/* Favorite Button */}
      <Pressable
        onPress={(e) => handleToggleFavorite(recipe, e)}
        p="$2"
      >
        <Heart 
          size={22} 
          color={isFavorite(recipe.id) ? '#FF4757' : '#666'} 
          fill={isFavorite(recipe.id) ? '#FF4757' : 'transparent'} 
        />
      </Pressable>
    </Pressable>
  );

  return (
    <Box flex={1} bg="$white">
      {/* Header */}
      <Box bg="#00A86B" pt="$16" pb="$2" px="$6">
        <HStack alignItems="center" space="md" mb="$4">
          <Pressable onPress={onGoBack}>
            <ArrowLeft size={24} color="white" />
          </Pressable>
          <VStack flex={1}>
            <Text fontSize="$xl" fontWeight="$bold" color="white">
              {selectedCategory} Recipes
            </Text>
            <Text fontSize="$sm" color="rgba(255,255,255,0.8)">
              {recipes.length} recipes found
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Content */}
      {loading ? (
        <VStack px="$4" py="$4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Box
              key={item}
              bg="#E8F5E8"
              borderRadius="$2xl"
              px="$4"
              py="$3"
              mb="$3"
              flexDirection="row"
              alignItems="center"
              shadowColor="#000000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={4}
              elevation={3}
            >
              {/* Skeleton Image */}
              <Skeleton 
                variant="rounded" 
                style={{ width: 60, height: 60, borderRadius: 12 }} 
              />
              
              {/* Skeleton Title */}
              <Box flex={1} ml="$4">
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 160, height: 20, borderRadius: 8 }} 
                />
              </Box>
              
              {/* Skeleton Heart */}
              <Skeleton 
                variant="circular" 
                style={{ width: 24, height: 24, borderRadius: 12 }} 
              />
            </Box>
          ))}
        </VStack>
      ) : recipes.length > 0 ? (
        <ScrollView flex={1} px="$4" py="$4">
          {recipes.map(recipe => renderRecipeCard(recipe))}
            
          {/* End message */}
          <VStack alignItems="center" space="md" py="$6">
            <Text color="$coolGray400" textAlign="center" size="sm">
              End of results
            </Text>
            <Pressable 
              bg="#F0FDF4" 
              px="$6" 
              py="$3" 
              borderRadius="$full"
              borderColor="#00A86B"
              borderWidth="$1"
              onPress={onGoBack}
            >
              <Text color="#00A86B" fontWeight="$semibold">
                Change Filter
              </Text>
            </Pressable>
          </VStack>
        </ScrollView>
      ) : (
        <VStack flex={1} alignItems="center" justifyContent="center" space="md" p="$6">
          <Text fontWeight="$bold" color="$coolGray600" size="lg">
            No recipes found
          </Text>
          <Text color="$coolGray400" textAlign="center" size="sm">
            Try selecting a different category
          </Text>
          <Pressable 
            bg="#F0FDF4" 
            px="$6" 
            py="$3" 
            borderRadius="$full"
            borderColor="#00A86B"
            borderWidth="$1"
            onPress={onGoBack}
          >
            <Text color="#00A86B" fontWeight="$semibold">
              Change Filter
            </Text>
          </Pressable>
        </VStack>
      )}
    </Box>
  );
}
