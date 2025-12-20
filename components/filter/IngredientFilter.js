import React from 'react';
import { 
  VStack, 
  Text, 
  HStack, 
  Pressable,
  Box
} from '@gluestack-ui/themed';
import { Image, ScrollView } from 'react-native';

// import gambar ingredients
const carrotImg = require('../../assets/carrot.png');
const chickenImg = require('../../assets/chicken.png');
const limeImg = require('../../assets/lime.png');
const mushroomImg = require('../../assets/mushroom.png');
const onionImg = require('../../assets/onion.png');
const tomatoImg = require('../../assets/tomato.png');

// data ingredients
const ingredients = [
  { id: 1, name: 'Chicken', img: chickenImg },
  { id: 2, name: 'Tomato', img: tomatoImg },
  { id: 3, name: 'Onion', img: onionImg },
  { id: 4, name: 'Carrot', img: carrotImg },
  { id: 5, name: 'Lime', img: limeImg },
  { id: 6, name: 'Mushroom', img: mushroomImg },
  { id: 1, name: 'Chicken', img: chickenImg },
  { id: 2, name: 'Tomato', img: tomatoImg },
  { id: 3, name: 'Onion', img: onionImg },
  { id: 4, name: 'Carrot', img: carrotImg },
  { id: 5, name: 'Lime', img: limeImg },
  { id: 6, name: 'Mushroom', img: mushroomImg },
  { id: 1, name: 'Chicken', img: chickenImg },
  { id: 2, name: 'Tomato', img: tomatoImg },
  { id: 3, name: 'Onion', img: onionImg },
  { id: 4, name: 'Carrot', img: carrotImg },
  { id: 5, name: 'Lime', img: limeImg },
  { id: 6, name: 'Mushroom', img: mushroomImg }
];

export default function IngredientFilter({
  selectedIngredient,
  onIngredientSelect
}) {

  return (
    <VStack flex={1} bg="#00A86B">
      {/* Header*/}
      <VStack p="$6" pt="$2" pb="$2">
        <Text fontSize="$3xl" fontWeight="$bold" color="white">
          Browse by Ingredients
        </Text>
        <Text fontSize="$md" color="rgba(255,255,255,0.8)">
          Quick Explore with categories tags
        </Text>
      </VStack>
      
      {/* White Container */}
      <VStack
        flex={1}
        bg="white" 
        borderTopLeftRadius={50} 
        borderTopRightRadius={50}
        mt="$6"
      >
        {/* Choose your ingredients */}
        <VStack pt="$6" px="$6" pb="$3" bg="white" borderTopLeftRadius={50} borderTopRightRadius={50}>
          <Text fontSize="$2xl" fontWeight="$bold" color="$coolGray800">
            Choose your ingredients
          </Text>
        </VStack>

        {/* Konten all ingredients */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <VStack px="$6" space="md">
            {Array.from({ length: Math.ceil(ingredients.length / 3) }, (_, rowIndex) => (
              <HStack key={rowIndex} space="md" justifyContent="space-between">
                {ingredients.slice(rowIndex * 3, (rowIndex + 1) * 3).map((ingredient) => (
                  <Pressable
                    key={ingredient.id}
                    flex={1}
                    aspectRatio={0.95}
                    bg="$white"
                    borderRadius="$2xl"
                    justifyContent="center"
                    alignItems="center"
                    onPress={() => onIngredientSelect(ingredient.id)}
                    mx="$1"
                    p="$3"
                    shadowColor="#000000"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.15}
                    shadowRadius={8}
                    elevation={5}
                  >
                    <Image 
                      source={ingredient.img}
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    />
                    <Text 
                      fontSize="$md" 
                      textAlign="center" 
                      color="$coolGray700"
                      fontWeight="$medium"
                      mt="$2"
                    >
                      {ingredient.name}
                    </Text>
                  </Pressable>
                ))}
                {rowIndex === Math.ceil(ingredients.length / 3) - 1 && 
                 ingredients.length % 3 !== 0 && (
                  Array.from({ length: 3 - (ingredients.length % 3) }, (_, emptyIndex) => (
                    <Box key={`empty-${emptyIndex}`} flex={1} mx="$1" />
                  ))
                )}
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
}