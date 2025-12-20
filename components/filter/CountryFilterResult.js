import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Pressable
} from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { Image, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CountryResultScreen({ selectedCountry = 'French', onGoBack }) {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!selectedCountry) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`);
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
  }, [selectedCountry]);

  const handleRecipePress = (recipeId) => {
    router.push(`/filter/recipes/${recipeId}`);
  };

  // Render recipe card
  const renderRecipeCard = (recipe) => (
    <Pressable
      key={recipe.id}
      flex={1}
      bg="#E8F5E8"
      borderRadius="$3xl"
      p="$4"
      aspectRatio={1}
      justifyContent="space-between"
      mx="$1"
      shadowColor="#000000"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.15}
      shadowRadius={8}
      elevation={6}
      onPress={() => handleRecipePress(recipe.id)}
    >
      <Box alignItems="center" justifyContent="center" flex={1}>
        <Image 
          source={recipe.image}
          style={{ width: 100, height: 100, borderRadius: 12 }}
          resizeMode="cover"
        />
      </Box>
      <VStack alignItems="center" mt="$2">
        <Text fontWeight="$bold" textAlign="center" size="sm" color="$coolGray800" numberOfLines={2}>
          {recipe.name}
        </Text>
      </VStack>
    </Pressable>
  );

  // Create rows of 2 recipes each
  const renderRecipeRows = () => {
    const rows = [];
    for (let i = 0; i < recipes.length; i += 2) {
      const rowRecipes = recipes.slice(i, i + 2);
      rows.push(
        <HStack key={i} space="md" justifyContent="space-between" mb="$3">
          {rowRecipes.map(recipe => renderRecipeCard(recipe))}
          {rowRecipes.length === 1 && <Box flex={1} mx="$1" />}
        </HStack>
      );
    }
    return rows;
  };

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
             Meals from {selectedCountry}
            </Text>
            <Text fontSize="$sm" color="rgba(255,255,255,0.8)">
              {recipes.length} recipes found
            </Text>
          </VStack>
        </HStack>
      </Box>

      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#00A86B" />
        </Box>
      ) : recipes.length > 0 ? (
        <ScrollView flex={1} p="$4">
          <VStack space="md">
            {renderRecipeRows()}
            
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
          </VStack>
        </ScrollView>
      ) : (
        <VStack flex={1} alignItems="center" justifyContent="center" space="md" p="$6">
          <Text fontWeight="$bold" color="$coolGray600" size="lg">
            No recipes found
          </Text>
          <Text color="$coolGray400" textAlign="center" size="sm">
            Try selecting a different country
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