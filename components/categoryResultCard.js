import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity onPress={() => onPress(category)} activeOpacity={0.8}>
    <Box
      bg="white"
      borderRadius="$xl"
      mb="$3"
      overflow="hidden"
      shadowColor="$coolGray300"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <Box flexDirection="row" alignItems="center">
        {category.icon && (
          <Image
            source={category.icon}
            style={{ width: 80, height: 80 }}
            resizeMode="cover"
          />
        )}
        <Box flex={1} p="$3">
          <Text fontSize="$md" fontWeight="$bold" color="$coolGray800">
            {category.label}
          </Text>
          <Text fontSize="$sm" color="$coolGray600" numberOfLines={2} mt="$1">
            {category.description}
          </Text>
        </Box>
      </Box>
    </Box>
  </TouchableOpacity>
);

export default CategoryCard;