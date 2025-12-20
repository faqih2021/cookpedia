import React, { useEffect, useState } from 'react';
import { 
  ScrollView, 
  VStack, 
  Text, 
  HStack, 
  Pressable,
  Box
} from '@gluestack-ui/themed';
import { Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IngredientFilter({
  selectedIngredient,
  onIngredientSelect
}) {
  const router = useRouter();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const json = await res.json();
        const items = (json?.meals || []).slice(0, 30).map((item, idx) => ({
          id: idx + 1,
          name: item.strIngredient,
          img: { uri: `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
        }));
        setIngredients(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientPress = (ingredient) => {
    if (onIngredientSelect) {
      onIngredientSelect(ingredient.id, ingredient.name);
    }
    router.push(`/filter/result/ingredients-filter-result?ingredient=${encodeURIComponent(ingredient.name)}`);
  };

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

        {loading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="#00A86B" />
          </Box>
        ) : (
          <ScrollView
            flex={1}
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
                      onPress={() => handleIngredientPress(ingredient)}
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
                        numberOfLines={1}
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
        )}
      </VStack>
    </VStack>
  );
}