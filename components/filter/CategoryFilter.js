import React from 'react';
import { 
  VStack, 
  Text, 
  Pressable
} from '@gluestack-ui/themed';
import { Image, ScrollView } from 'react-native';
import { categories } from '../../data/filterData';

export default function CategoryFilter({ onCategorySelect }) {
  return (
    <VStack flex={1} bg="#00A86B">
      {/* Header */}
      <VStack p="$6" pt="$2" pb="$6">
        <Text fontSize="$3xl" fontWeight="$bold" color="white">
          Browse by Category
        </Text>
        <Text fontSize="$md" color="rgba(255,255,255,0.8)">
          Quick Explore with categories tags
        </Text>
      </VStack>
      
      {/* Daftar kategiri*/}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      >
        <VStack space="md">
          {categories.map((category) => (
            <Pressable
              key={category.id}
              bg="white"
              borderRadius="$2xl"
              p="$4"
              onPress={() => onCategorySelect(category.name)}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              shadowColor="#000000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={4}
              elevation={3}
            >
              <Text 
                fontSize="$xl" 
                fontWeight="$bold" 
                color="$coolGray800"
                flex={1}
              >
                {category.name}
              </Text>
              <Image 
                source={category.image}
                style={{ 
                  width: 60, 
                  height: 60,
                  borderRadius: 30
                }}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}