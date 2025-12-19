import React, { useState, useEffect } from "react";
import { ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../../components/searchBar";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("recipe");
  
  const [allCategories, setAllCategories] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const catJson = await catRes.json();
        const categories = (catJson?.categories || []).map(c => ({
          id: c.strCategory.toLowerCase(),
          label: c.strCategory,
          icon: { uri: c.strCategoryThumb }
        }));
        setAllCategories(categories);
        setFilteredCategories(categories);

        const recipePromises = Array(25).fill(null).map(() =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
        );
        const recipeResults = await Promise.all(recipePromises);
        const allMeals = recipeResults
          .map(r => r?.meals?.[0])
          .filter(Boolean);
        
        const uniqueMeals = [...new Map(allMeals.map(m => [m.idMeal, m])).values()];
        
        const recipes = uniqueMeals.map(m => ({
          id: m.idMeal,
          title: m.strMeal,
          by: m.strCategory || 'Unknown',
          image: { uri: m.strMealThumb }
        }));
        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    
    if (text.trim().length === 0) {
      // Reset to show all
      setFilteredCategories(allCategories);
      setFilteredRecipes(allRecipes);
      return;
    }

    const query = text.toLowerCase();
    
    const filteredCats = allCategories.filter(c => 
      c.label.toLowerCase().startsWith(query.charAt(0))
    );
    setFilteredCategories(filteredCats);

    const filteredRecs = allRecipes.filter(r =>
      r.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(filteredRecs);
  };

  const handleSearchSubmit = async () => {
    if (searchQuery.trim().length === 0) return;

    const query = searchQuery.trim();
    const firstLetter = query.charAt(0).toLowerCase();

    setLoading(true);
    try {
      if (searchType === "recipe") {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
        const json = await res.json();
        const meals = json?.meals || [];
        const filtered = meals
          .filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase()))
          .map(m => ({
            id: m.idMeal,
            title: m.strMeal,
            by: m.strCategory || 'Unknown',
            image: { uri: m.strMealThumb }
          }));
        setFilteredRecipes(filtered);
      } else {
        const filtered = allCategories.filter(c =>
          c.label.toLowerCase().startsWith(firstLetter)
        );
        setFilteredCategories(filtered);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="white">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$4">
            <Box width="80%">
              <Text size="2xl" fontWeight="$bold">
                What do you want to search, Faqih?
              </Text>
            </Box>
          </Box>

          <SearchBar 
            searchQuery={searchQuery}
            searchType={searchType}
            onSearchChange={handleSearchChange}
            onSearchTypeChange={handleSearchTypeChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {loading ? (
            <Box justifyContent="center" alignItems="center" py="$8">
              <ActivityIndicator size="large" color="#00A86B" />
            </Box>
          ) : (
            <>
              {searchType === "category" && (
                <Box>
                  <Text size="lg" fontWeight="$bold" mb="$3">
                    Categories {filteredCategories.length > 0 && `(${filteredCategories.length})`}
                  </Text>
                  <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                    {filteredCategories.map((cat) => (
                      <TouchableOpacity 
                        key={cat.id} 
                        onPress={() => router.push(`/categories/${cat.id}`)}
                        activeOpacity={0.8}
                        style={{ width: '48%', marginBottom: 16 }}
                      >
                        <Box 
                          alignItems="center" 
                          bg="$coolGray50" 
                          borderRadius={12} 
                          py="$3"
                        >
                          <Box 
                            width={80} 
                            height={80} 
                            borderRadius={40} 
                            overflow="hidden" 
                            bg="$white"
                            mb="$2"
                          >
                            <Image source={cat.icon} style={{ width: 80, height: 80 }} />
                          </Box>
                          <Text fontSize="$sm" fontWeight="$medium" textAlign="center">{cat.label}</Text>
                        </Box>
                      </TouchableOpacity>
                    ))}
                  </Box>
                  {filteredCategories.length === 0 && (
                    <Text color="$coolGray400" textAlign="center" py="$4">No categories found</Text>
                  )}
                </Box>
              )}

              {searchType === "recipe" && (
                <Box>
                  <Text size="lg" fontWeight="$bold" mb="$3">
                    Recipes {filteredRecipes.length > 0 && `(${filteredRecipes.length})`}
                  </Text>
                  {filteredRecipes.map((recipe) => (
                    <TouchableOpacity 
                      key={recipe.id} 
                      onPress={() => router.push(`/recipes/${recipe.id}`)}
                      activeOpacity={0.8}
                    >
                      <Box 
                        flexDirection="row" 
                        mb="$3" 
                        bg="$white" 
                        borderRadius={12} 
                        overflow="hidden"
                        borderWidth={1}
                        borderColor="$coolGray100"
                      >
                        <Image 
                          source={recipe.image} 
                          style={{ width: 100, height: 80 }} 
                        />
                        <Box flex={1} px="$3" py="$2" justifyContent="center">
                          <Text fontWeight="$bold" numberOfLines={1}>{recipe.title}</Text>
                          <Text color="$coolGray400" fontSize="$sm" mt="$1">{recipe.by}</Text>
                        </Box>
                      </Box>
                    </TouchableOpacity>
                  ))}
                  {filteredRecipes.length === 0 && (
                    <Text color="$coolGray400" textAlign="center" py="$4">No recipes found</Text>
                  )}
                </Box>
              )}
            </>
          )}

        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}