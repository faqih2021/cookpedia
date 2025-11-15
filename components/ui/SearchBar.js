import React from 'react';
import { Box, Input, InputField, HStack } from '@gluestack-ui/themed';
import { Search } from 'lucide-react-native';

export default function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChangeText 
}) {
  return (
    <HStack 
      bg="$coolGray50" 
      borderRadius="$full" 
      px="$4" 
      py="$3" 
      alignItems="center" 
      space="sm"
    >
      <Search size={20} color="#666" />
      <Input flex={1} variant="unstyled">
        <InputField 
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          fontSize="$sm"
        />
      </Input>
    </HStack>
  );
}