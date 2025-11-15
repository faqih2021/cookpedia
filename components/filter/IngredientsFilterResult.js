import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  ScrollView,
  Pressable
} from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { Image } from 'react-native';

export default function IngredientsResultScreen({ selectedIngredients = ['Chicken Breast'], onGoBack }) {
  // data resep
  const recipes = [
    {
      id: 1,
      name: 'Chicken Alfredo',
      image: require('../../assets/chicken-alfredo.png')
    },
    {
      id: 2,
      name: 'Chicken Basquaise',
      image: require('../../assets/chicken-basquaise.png')
    },
    {
      id: 3,
      name: 'Chicken Handi',
      image: require('../../assets/chicken-handi.png')
    },
    {
      id: 4,
      name: 'Chicken Karage',
      image: require('../../assets/chicken-karage.png')
    },
    {
      id: 5,
      name: 'Chicken Mushroom Hotpot',
      image: require('../../assets/chicken-mushroom-hotpot.png')
    },
    {
      id: 6,
      name: 'Ayam Goreng',
      image: require('../../assets/ayam-goreng.jpeg')
    }
  ];

  return (
    <Box flex={1} bg="white">
      {/* header */}
      <Box bg="#00A86B" pt="$12" pb="$4">
        <HStack alignItems="center" px="$4" space="md">
          <Pressable onPress={onGoBack}>
            <ArrowLeft size={24} color="white" />
          </Pressable>
          <VStack flex={1}>
            <Text color="white" fontWeight="$bold" size="lg">
              Recipes with {selectedIngredients[0]}
            </Text>
            <Text color="white" size="sm" opacity={0.8}>
              {recipes.length} recipes found
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* grid*/}
      <ScrollView flex={1} p="$4">
        <VStack space="lg">
          {/* row pertama */}
          <HStack space="md" justifyContent="space-between">
            {recipes.slice(0, 2).map((recipe) => (
              <Pressable
                key={recipe.id}
                flex={1}
                bg="#E8F5E8"
                borderRadius="$3xl"
                p="$6"
                aspectRatio={1}
                justifyContent="space-between"
                mx="$1"
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.15}
                shadowRadius={8}
                elevation={6}
              >
                <Box alignItems="center" justifyContent="center" flex={1}>
                  <Image 
                    source={recipe.image}
                    style={{ width: 100, height: 100, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                </Box>
                <VStack alignItems="center" mt="$4">
                  <Text fontWeight="$bold" textAlign="center" size="md" color="$coolGray800">
                    {recipe.name}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>

          {/* Row 2*/}
          <HStack space="md" justifyContent="space-between">
            {recipes.slice(2, 4).map((recipe) => (
              <Pressable
                key={recipe.id}
                flex={1}
                bg="#E8F5E8"
                borderRadius="$3xl"
                p="$6"
                aspectRatio={1}
                justifyContent="space-between"
                mx="$1"
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.15}
                shadowRadius={8}
                elevation={6}
              >
                <Box alignItems="center" justifyContent="center" flex={1}>
                  <Image 
                    source={recipe.image}
                    style={{ width: 100, height: 100, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                </Box>
                <VStack alignItems="center" mt="$4">
                  <Text fontWeight="$bold" textAlign="center" size="md" color="$coolGray800">
                    {recipe.name}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>

          {/*Row 3 */}
          <HStack space="md" justifyContent="space-between">
            <Pressable
              flex={1}
              bg="#E8F5E8"
              borderRadius="$3xl"
              p="$6"
              aspectRatio={1}
              justifyContent="space-between"
              mx="$1"
              shadowColor="#000000"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.15}
              shadowRadius={8}
              elevation={6}
            >
              <Box alignItems="center" justifyContent="center" flex={1}>
                <Image 
                  source={recipes[4].image}
                  style={{ width: 100, height: 100, borderRadius: 12 }}
                  resizeMode="cover"
                />
              </Box>
              <VStack alignItems="center" mt="$4">
                <Text fontWeight="$bold" textAlign="center" size="md" color="$coolGray800">
                  {recipes[4].name}
                </Text>
              </VStack>
            </Pressable>
            
            <Pressable
              flex={1}
              bg="#E8F5E8"
              borderRadius="$3xl"
              p="$6"
              aspectRatio={1}
              justifyContent="space-between"
              mx="$1"
              shadowColor="#000000"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.15}
              shadowRadius={8}
              elevation={6}
            >
              <Box alignItems="center" justifyContent="center" flex={1}>
                <Image 
                  source={recipes[5].image}
                  style={{ width: 100, height: 100, borderRadius: 12 }}
                  resizeMode="cover"
                />
              </Box>
              <VStack alignItems="center" mt="$4">
                <Text fontWeight="$bold" textAlign="center" size="md" color="$coolGray800">
                  {recipes[5].name}
                </Text>
              </VStack>
            </Pressable>
          </HStack>

          {/* No more recipes message */}
          <VStack alignItems="center" space="md" py="$8">
            <Text fontWeight="$bold" color="$coolGray600" size="lg">
              No more recipes found
            </Text>
            <Text color="$coolGray400" textAlign="center" size="sm">
              Try select different ingredients
            </Text>
            <Pressable 
              bg="#F0FDF4" 
              px="$6" 
              py="$3" 
              borderRadius="$full"
              borderColor="#00A86B"
              borderWidth="$1"
              onPress={onGoBack}
            >
              <Text color="#00A86B" fontWeight="$semibold">
                Change Filter
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}