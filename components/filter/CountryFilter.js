import React from 'react';
import { 
  ScrollView, 
  VStack, 
  Text, 
  HStack, 
  Box,
  Pressable
} from '@gluestack-ui/themed';
import { Image } from 'react-native';
import CountryCard from './CountryCard';
import { featuredCountries, allCountries, popularIngredients } from '../../data/filterData';

export default function CountryFilter({
  onCountrySelect
}) {
  return (
    <VStack flex={1} bg="#00A86B">
      {/* Header */}
      <VStack p="$6" pt="$2" pb="$2">
        <Text fontSize="$3xl" fontWeight="$bold" color="white">
          Explore by Country
        </Text>
        <Text fontSize="$md" color="rgba(255,255,255,0.8)">
          Discover recipes from around the world
        </Text>
      </VStack>
      {/* Popular Country */}
      <VStack p="$6" pt="$4">
        <Text 
          fontSize="$lg" 
          fontWeight="$bold" 
          color="$coolGray800" 
          bg="white" 
          px="$4" 
          py="$2" 
          borderRadius="$3xl"
          alignSelf="flex-start"
          mb="$3"
        >
          Popular Country
        </Text>

        <Pressable
          bg="$white"
          borderRadius="$2xl"
          p="$4"
          onPress={() => onCountrySelect(allCountries[5].name)}
          shadowColor="#000000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={8}
          elevation={5}
        >
          <HStack alignItems="center" space="md">
            <Image 
              source={allCountries[5].flag}
              style={{ 
                width: 80, 
                height: 60, 
                borderRadius: 8, 
                borderWidth: 2, 
                borderColor: '#E5E7EB' 
              }}
              resizeMode="cover"
            />
            <Text fontSize="$2xl" fontWeight="$bold" color="$coolGray800">
              {allCountries[5].name}
            </Text>
          </HStack>
        </Pressable>
      </VStack>
      
      {/* White Container*/}
      <VStack
        flex={1}
        bg="white" 
        borderTopLeftRadius={50} 
        borderTopRightRadius={50}
        mt="$0"
      >
        {/* Header - All Countries */}
        <VStack pt="$8" px="$6" pb="$3" bg="white" borderTopLeftRadius={50} borderTopRightRadius={50}>
          <Text fontSize="$md" fontWeight="$bold" color="$coolGray800">
            All Countries
          </Text>
        </VStack>

        {/* Konten all country */}
        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <VStack px="$6" space="md">
            {Array.from({ length: Math.ceil(allCountries.length / 3) }, (_, rowIndex) => (
              <HStack key={rowIndex} space="md" justifyContent="space-between">
                {allCountries.slice(rowIndex * 3, (rowIndex + 1) * 3).map((country) => (
                  <Pressable
                    key={country.id}
                    flex={1}
                    bg="$white"
                    borderRadius="$2xl"
                    justifyContent="center"
                    alignItems="center"
                    py="$4"
                    px="$3"
                    onPress={() => onCountrySelect(country.name)}
                    shadowColor="#000000"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.15}
                    shadowRadius={8}
                    elevation={5}
                  >
                    <Image 
                      source={country.flag}
                      style={{ 
                        width: 50, 
                        height: 35, 
                        borderRadius: 8, 
                        borderWidth: 2, 
                        borderColor: '#E5E7EB' 
                      }}
                      resizeMode="cover"
                    />
                    <Text fontSize="$sm" fontWeight="$bold" color="$coolGray800" mt="$2" textAlign="center">
                      {country.name}
                    </Text>
                  </Pressable>
                ))}
                {allCountries.slice(rowIndex * 3, (rowIndex + 1) * 3).length < 3 &&
                  Array.from({ length: 3 - allCountries.slice(rowIndex * 3, (rowIndex + 1) * 3).length }).map((_, emptyIndex) => (
                    <Box key={`empty-${emptyIndex}`} flex={1} />
                  ))
                }
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
}