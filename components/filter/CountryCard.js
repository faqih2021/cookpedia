import React from 'react';
import { Pressable, Text, VStack } from '@gluestack-ui/themed';
import { Image } from 'react-native';

export default function CountryCard({ 
  country, 
  onPress, 
  size = 'large' 
}) {
  if (size === 'small') {
    return (
      <Pressable
        flex={1}
        bg="$white"
        borderRadius="$2xl"
        justifyContent="center"
        alignItems="center"
        py="$4"
        px="$3"
        onPress={() => onPress(country.name)}
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
    );
  }

  return (
    <Pressable
      flex={1}
      aspectRatio={1}
      bg="$white"
      borderRadius="$2xl"
      justifyContent="center"
      alignItems="center"
      p="$4"
      onPress={() => onPress(country.name)}
      shadowColor="#000000"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.15}
      shadowRadius={8}
      elevation={5}
    >
      <Image 
        source={country.flag}
        style={{ 
          width: 80, 
          height: 55, 
          borderRadius: 12, 
          borderWidth: 2, 
          borderColor: '#E5E7EB' 
        }}
        resizeMode="cover"
      />
      <Text fontSize="$lg" fontWeight="$bold" color="$coolGray800" mt="$3" textAlign="center">
        {country.name}
      </Text>
    </Pressable>
  );
}