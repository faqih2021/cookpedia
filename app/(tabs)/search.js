import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../../components/searchBar";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("recipe");

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    console.log("Search type changed to:", type);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    console.log(`Searching ${searchType}:`, text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      if (searchType === "recipe") {
        router.push({
          pathname: "/recipeResults",
          params: { query: searchQuery }
        });
      } else {
        router.push({
          pathname: "/categoryResults",
          params: { query: searchQuery }
        });
      }
    }
  };

  return (
    <Box flex={1} bg="white">
      <SafeAreaView>
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

        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}