import React, { useState, useEffect } from "react";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/search/searchBar";

// Data recipes
const ALL_RECIPES = [
  { id: '1', title: 'Ayam Goreng', by: 'By Paki', image: require('../../assets/ayam-goreng.jpeg') },
  { id: '2', title: 'Belalang Goreng', by: 'By Dwik', image: require('../../assets/belalang.jpeg') },
  { id: '3', title: 'Tempe Allright', by: 'By Tang', image: require('../../assets/tempe.jpeg') },
  { id: '4', title: 'Sop Buah', by: 'By Syeghandy', image: require('../../assets/sopbuah.jpg') },
  { id: '5', title: 'Tahu Tek', by: 'By Mangdalla', image: require('../../assets/tahutek.jpg') }
];

// Data categories
const ALL_CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast', icon: require('../../assets/breakfast.png') },
  { id: 'lunch', label: 'Lunch', icon: require('../../assets/lunch.png') },
  { id: 'dinner', label: 'Dinner', icon: require('../../assets/dinner.png') },
  { id: 'dessert', label: 'Dessert', icon: require('../../assets/dessert.png') },
  { id: 'snack', label: 'Snack', icon: require('../../assets/snack.png') }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("recipe");
  const [searchResults, setSearchResults] = useState([]);

  // Search effect - filter results when query or type changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.trim().toLowerCase();
      
      if (searchType === "recipe") {
        const results = ALL_RECIPES.filter(recipe => 
          recipe.title.toLowerCase().includes(query)
        ).slice(0, 10); // Limit 10 results
        setSearchResults(results);
      } else {
        const results = ALL_CATEGORIES.filter(category => 
          category.label.toLowerCase().includes(query)
        ).slice(0, 10); // Limit 10 results
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchType]);

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
      console.log("Selected recipe:", item.title);
    } else {
      console.log("Selected category:", item.label);
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
        <Image
          source={recipe.image}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />
        <Box p="$3" flex={1} justifyContent="center">
          <Text fontSize="$md" fontWeight="$bold" color="$coolGray800" mb="$1">
            {recipe.title}
          </Text>
          <Text fontSize="$sm" color="$coolGray500">
            {recipe.by}
          </Text>
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
        <Image
          source={category.icon}
          style={{ width: 80, height: 80 }}
          resizeMode="cover"
        />
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