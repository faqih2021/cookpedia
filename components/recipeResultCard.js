import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

export default function RecipeCard({ recipe, onPress }) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(recipe);
    } else {
      router.push(`/recipes/${recipe.id}`);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Box
        bg="white"
        borderRadius="$xl"
        overflow="hidden"
        mb="$4"
        shadowColor="$coolGray300"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={3}
      >
        <Image
          source={recipe.image}
          style={{ width: "100%", height: 180 }}
          resizeMode="cover"
        />
        
        <Box p="$4">
          <Text fontSize="$lg" fontWeight="$bold" mb="$2" color="$coolGray800">
            {recipe.title}
          </Text>
          
          <Text fontSize="$sm" color="$coolGray600" mb="$3">
            {recipe.by}
          </Text>

        </Box>
      </Box>
    </TouchableOpacity>
  );
}