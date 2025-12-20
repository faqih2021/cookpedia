import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import RecipeCard from "../components/recipeResultCard";

export default function RecipeResultsScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const searchTerm = query.trim();
      const firstLetter = searchTerm.charAt(0).toLowerCase();
      
      const fetchRecipes = async () => {
        setLoading(true);
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
          const json = await res.json();
          const meals = json?.meals || [];
          
          const filtered = meals.filter(m => 
            m.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          const results = filtered.map(m => ({
            id: m.idMeal,
            title: m.strMeal,
            by: m.strCategory || 'Unknown',
            image: { uri: m.strMealThumb }
          }));
          
          setSearchResults(results);
        } catch (e) {
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    }
  }, [query]);

  const handleRecipePress = (recipe) => {
    console.log("Navigate to recipe:", recipe.id);
  };

  return (
    <Box flex={1} bg="$coolGray50">
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}>
          <Box flexDirection="row" alignItems="center" mb="$6" gap="$3">
            <TouchableOpacity onPress={() => router.back()}>
              <Box
                bg="white"
                p="$2.5"
                borderRadius="$lg"
                shadowColor="$coolGray300"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.1}
                shadowRadius={4}
                elevation={2}
              >
                <ArrowLeft size={24} color="#1F2937" />
              </Box>
            </TouchableOpacity>
            
            <Box flex={1}>
              <Text fontSize="$sm" color="$coolGray600" mb="$1">
                Recipe Search Results
              </Text>
              <Text fontSize="$xl" fontWeight="$bold" color="$coolGray800">
                "{query}"
              </Text>
            </Box>
          </Box>

          <Box mb="$4">
            <Text fontSize="$md" color="$coolGray700">
              Found <Text fontWeight="$bold" color="$green500">{searchResults.length}</Text> recipes
            </Text>
          </Box>

          {loading ? (
            <Box justifyContent="center" alignItems="center" mt="$8">
              <ActivityIndicator size="large" color="#00A86B" />
              <Text mt="$3" color="$coolGray600">Searching...</Text>
            </Box>
          ) : searchResults.length > 0 ? (
            searchResults.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                onPress={handleRecipePress}
              />
            ))
          ) : (
            <Box
              bg="white"
              p="$8"
              borderRadius="$xl"
              alignItems="center"
              mt="$8"
            >
              <Text fontSize="$5xl" mb="$3">
                🔍
              </Text>
              <Text fontSize="$lg" fontWeight="$bold" color="$coolGray800" mb="$2">
                No recipes found
              </Text>
              <Text fontSize="$sm" color="$coolGray600" textAlign="center">
                Try searching with different keywords
              </Text>
            </Box>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}