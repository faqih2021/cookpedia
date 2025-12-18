import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(category)}
    >
      <Box
        bg="white"
        borderRadius="$2xl"
        overflow="hidden"
        mb="$4"
        shadowColor="$coolGray300"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.15}
        shadowRadius={8}
        elevation={3}
      >
        <Box position="relative" height={200}>
          <Image
            source={category.icon}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.3)"
          />
          
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p="$5"
          >
            <Text
              fontSize="$2xl"
              fontWeight="$bold"
              color="$white"
              mb="$1"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.3}
              shadowRadius={2}
            >
              {category.label}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}