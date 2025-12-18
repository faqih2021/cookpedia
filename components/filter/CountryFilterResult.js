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

export default function CountryResultScreen({ selectedCountry = 'French', onGoBack }) {
  const recipes = [
    {
      id: 1,
      name: 'Chocolate Gateau',
      image: require('../../assets/chocolate-gateau.png')
    },
    {
      id: 2,
      name: 'Pork Cassoulet',
      image: require('../../assets/pork-cassoulet.png')
    },
    {
      id: 3,
      name: 'Tuna Nicoise',
      image: require('../../assets/tuna-nicoise.png')
    },
    {
      id: 4,
      name: 'Flamice',
      image: require('../../assets/flamice.png')
    },
    {
      id: 5,
      name: 'Ratatouille',
      image: require('../../assets/ratatouille.png')
    }
  ];

  return (
    <Box flex={1} bg="$white">
      {/* Header */}
      <Box bg="#00A86B" pt="$16" pb="$2" px="$6">
        <HStack alignItems="center" space="md" mb="$4">
          <Pressable onPress={onGoBack}>
            <ArrowLeft size={24} color="white" />
          </Pressable>
          <VStack flex={1}>
            <Text fontSize="$xl" fontWeight="$bold" color="white">
             Meals from the {selectedCountry} Area
            </Text>
            <Text fontSize="$sm" color="rgba(255,255,255,0.8)">
              {recipes.length} recipes found
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Grid */}
      <ScrollView flex={1} p="$4">
        <VStack space="lg">
          {/* Row 1*/}
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

          {/* Row 2 */}
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

          {/* Row 3 */}
          <HStack space="md" justifyContent="center">
            <Pressable
              width="48%"
              bg="#E8F5E8"
              borderRadius="$3xl"
              p="$6"
              aspectRatio={1}
              justifyContent="space-between"
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
          </HStack>

          {/* No more recipes message */}
          <VStack alignItems="center" space="md" py="$8">
            <Text fontWeight="$bold" color="$coolGray600" size="lg">
              No more recipes found
            </Text>
            <Text color="$coolGray400" textAlign="center" size="sm">
              Try select different country
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