import React from "react";
import { Box, Input, InputField, InputSlot, Icon, Button, ButtonText } from "@gluestack-ui/themed";
import { SearchIcon } from "lucide-react-native";

export default function SearchBar({ 
  searchQuery, 
  searchType = "recipe",
  onSearchChange, 
  onSearchTypeChange,
  onSearchSubmit 
}) {

  const handleSearchTypeChange = (type) => {
    onSearchTypeChange?.(type);
  };

  const handleSubmit = () => {
    onSearchSubmit?.();
  };

  return (
    <Box mb="$6">
      <Box flexDirection="row" alignItems="center" gap="$3" mb="$3">
        <Box flex={1}>
          <Input
            variant="outline"
            size="xl"
            borderRadius="$xl"
            bg="$coolGray50"
            borderColor="$coolGray200"
            h={56}
            sx={{
              ":focus": {
                borderColor: "#00A86B",
                bg: "$white",
              },
            }}
          >
            <InputSlot pl="$4">
              <Icon as={SearchIcon} color="$coolGray400" size="xl" />
            </InputSlot>
            <InputField
              placeholder={`Search ${searchType === "recipe" ? "recipes" : "categories"}...`}
              value={searchQuery}
              onChangeText={onSearchChange}
              onSubmitEditing={handleSubmit}
              returnKeyType="search"
              fontSize="$md"
              color="$coolGray800"
              placeholderTextColor="$coolGray400"
            />
          </Input>
        </Box>
        
        {searchQuery.length > 0 && (
          <Button
            size="xl"
            bg="#00A86B"
            borderRadius="$xl"
            h={56}
            px="$5"
            onPress={handleSubmit}
          >
            <ButtonText color="$white" fontWeight="$semibold">
              Search
            </ButtonText>
          </Button>
        )}
      </Box>
      
      <Box flexDirection="row" alignItems="center" gap="$2">
        <Button
          flex={1}
          size="md"
          variant={searchType === "recipe" ? "solid" : "outline"}
          action={searchType === "recipe" ? "primary" : "secondary"}
          bg={searchType === "recipe" ? "#00A86B" : "transparent"}
          borderColor="#00A86B"
          borderRadius="$lg"
          onPress={() => handleSearchTypeChange("recipe")}
        >
          <ButtonText color={searchType === "recipe" ? "$white" : "#00A86B"}>
            Recipe
          </ButtonText>
        </Button>

        <Button
          flex={1}
          size="md"
          variant={searchType === "category" ? "solid" : "outline"}
          action={searchType === "category" ? "primary" : "secondary"}
          bg={searchType === "category" ? "#00A86B" : "transparent"}
          borderColor="#00A86B"
          borderRadius="$lg"
          onPress={() => handleSearchTypeChange("category")}
        >
          <ButtonText color={searchType === "category" ? "$white" : "#00A86B"}>
            Category
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
}