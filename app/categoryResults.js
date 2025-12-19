import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import CategoryCard from "../components/categoryResultCard";

export default function CategoryResultsScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const searchTerm = query.trim();
      const firstLetter = searchTerm.charAt(0).toLowerCase();

      const fetchCategories = async () => {
        setLoading(true);
        try {
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          const json = await res.json();
          const categories = json?.categories || [];

          const filtered = categories.filter(c =>
            c.strCategory.toLowerCase().startsWith(firstLetter)
          );

          const results = filtered.map(c => ({
            id: c.idCategory,
            label: c.strCategory,
            icon: { uri: c.strCategoryThumb },
            description: c.strCategoryDescription
          }));

          setSearchResults(results);
        } catch (e) {
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [query]);

  const handleCategoryPress = (category) => {
    router.push(`/categories/${category.label.toLowerCase()}`);
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
                Category Search Results
              </Text>
              <Text fontSize="$xl" fontWeight="$bold" color="$coolGray800">
                "{query}"
              </Text>
            </Box>
          </Box>

          <Box mb="$4">
            <Text fontSize="$md" color="$coolGray700">
              Found <Text fontWeight="$bold" color="$green500">{searchResults.length}</Text> categories
            </Text>
          </Box>

          {loading ? (
            <Box justifyContent="center" alignItems="center" mt="$8">
              <ActivityIndicator size="large" color="#00A86B" />
              <Text mt="$3" color="$coolGray600">Searching...</Text>
            </Box>
          ) : searchResults.length > 0 ? (
            searchResults.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                onPress={handleCategoryPress}
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
                No categories found
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