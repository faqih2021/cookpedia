import React, { useState, useEffect } from "react";
import { ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../../components/search/searchBar";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("recipe");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const json = await res.json();
        const categories = json?.categories || [];
        const mapped = categories.map(cat => ({
          id: cat.strCategory.toLowerCase(),
          label: cat.strCategory,
          icon: { uri: cat.strCategoryThumb },
          description: cat.strCategoryDescription
        }));
        setAllCategories(mapped);
      } catch (e) {
        console.error('Error fetching categories:', e);
        setAllCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Search effect - filter results when query or type changes
  useEffect(() => {
    const searchData = async () => {
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.trim().toLowerCase();
        const firstLetter = query.charAt(0);
        setLoading(true);

        try {
          if (searchType === "recipe") {
            // Fetch recipes by first letter
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
            const json = await res.json();
            const meals = json?.meals || [];
            
            // Filter by query and map results
            const results = meals
              .filter(meal => meal.strMeal.toLowerCase().includes(query))
              .map(meal => ({
                id: meal.idMeal,
                title: meal.strMeal,
                by: meal.strArea ? `${meal.strArea} Cuisine` : 'TheMealDB',
                image: { uri: meal.strMealThumb },
                category: meal.strCategory
              }))
              .slice(0, 10);
            
            setSearchResults(results);
          } else {
            // Filter categories by first letter
            const results = allCategories
              .filter(category => category.label.toLowerCase().startsWith(firstLetter))
              .filter(category => category.label.toLowerCase().includes(query))
              .slice(0, 10);
            
            setSearchResults(results);
          }
        } catch (e) {
          console.error('Search error:', e);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounce = setTimeout(searchData, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, searchType, allCategories]);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchResults([]); // Clear results when type changes
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    // No navigation needed, results show inline
    console.log(`Search submitted: ${searchQuery}`);
  };

  const handleResultPress = (item) => {
    if (searchType === "recipe") {
      router.push(`/filter/recipes/${item.id}`);
    } else {
      router.push(`/filter/categories/${item.id}`);
    }
  };

  // Recipe card component
  const RecipeResultCard = ({ recipe }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => handleResultPress(recipe)}>
      <Box
        bg="white"
        borderRadius="$xl"
        overflow="hidden"
        mb="$3"
        flexDirection="row"
        shadowColor="$coolGray300"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
      >
        {recipe.image && (
          <Image
            source={recipe.image}
            style={{ width: 100, height: 100 }}
            resizeMode="cover"
          />
        )}
        <Box p="$3" flex={1} justifyContent="center">
          <Text fontSize="$md" fontWeight="$bold" color="$coolGray800" mb="$1" numberOfLines={2}>
            {recipe.title}
          </Text>
          <Text fontSize="$sm" color="$coolGray500">
            {recipe.by}
          </Text>
          {recipe.category && (
            <Text fontSize="$xs" color="#00A86B" mt="$1">
              {recipe.category}
            </Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );

  // Category card component
  const CategoryResultCard = ({ category }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => handleResultPress(category)}>
      <Box
        bg="white"
        borderRadius="$xl"
        overflow="hidden"
        mb="$3"
        flexDirection="row"
        shadowColor="$coolGray300"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
      >
        {category.icon && (
          <Image
            source={category.icon}
            style={{ width: 80, height: 80 }}
            resizeMode="cover"
          />
        )}
        <Box p="$3" flex={1} justifyContent="center">
          <Text fontSize="$lg" fontWeight="$bold" color="$coolGray800">
            {category.label}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box flex={1} bg="white">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box mb="$4">
            <Text size="2xl" fontWeight="$bold">
              What do you want to search?
            </Text>
          </Box>

          <SearchBar 
            searchQuery={searchQuery}
            searchType={searchType}
            onSearchChange={handleSearchChange}
            onSearchTypeChange={handleSearchTypeChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Search Results */}
          {searchQuery.trim().length > 0 && (
            <Box mt="$4">
              {loading ? (
                <Box py="$8" alignItems="center">
                  <ActivityIndicator size="large" color="#00A86B" />
                  <Text fontSize="$sm" color="$coolGray500" mt="$2">
                    Searching...
                  </Text>
                </Box>
              ) : (
                <>
                  <Text fontSize="$sm" color="$coolGray500" mb="$3">
                    {searchResults.length > 0 
                      ? `Found ${searchResults.length} ${searchType === "recipe" ? "recipes" : "categories"}`
                      : `No ${searchType === "recipe" ? "recipes" : "categories"} found`
                    }
                  </Text>

                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      searchType === "recipe" 
                        ? <RecipeResultCard key={item.id} recipe={item} />
                        : <CategoryResultCard key={item.id} category={item} />
                    ))
                  ) : (
                    <Box
                      bg="$coolGray50"
                      p="$6"
                      borderRadius="$xl"
                      style={{ alignItems: 'center' }}
                    >
                      <Text fontSize="$4xl" mb="$2">🔍</Text>
                      <Text fontSize="$md" fontWeight="$semibold" color="$coolGray600" mb="$1">
                        No results found
                      </Text>
                      <Text fontSize="$sm" color="$coolGray400" textAlign="center">
                        Try different keywords
                      </Text>
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}

          {/* Empty state when no search */}
          {searchQuery.trim().length === 0 && (
            <Box mt="$8" style={{ alignItems: 'center' }}>
              <Text fontSize="$5xl" mb="$3">🍳</Text>
              <Text fontSize="$lg" fontWeight="$semibold" color="$coolGray600" mb="$1">
                Start searching
              </Text>
              <Text fontSize="$sm" color="$coolGray400" textAlign="center">
                Find your favorite recipes or categories
              </Text>
            </Box>
          )}

        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}