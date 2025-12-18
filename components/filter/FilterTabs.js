import React from 'react';
import { Box, Text, HStack, Pressable } from '@gluestack-ui/themed';

export default function FilterTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'ingredient', label: 'Ingredients' },
    { id: 'area', label: 'Countries' },
    { id: 'category', label: 'Category' }
  ];

  return (
    <Box bg="#00A86B" pt="$16" pb="$4">
      {/* Tab nvigasi */}
      <HStack justifyContent="space-between" px="$4">
        {tabs.map((tab) => (
          <Pressable 
            key={tab.id}
            flex={1} 
            py="$4" 
            bg={activeTab === tab.id ? '$white' : 'rgba(255,255,255,0.2)'}
            borderRadius="$3xl"
            mx="$1"
            onPress={() => onTabChange(tab.id)}
          >
            <Text 
              textAlign="center" 
              color={activeTab === tab.id ? '#00A86B' : '$white'}
              fontWeight="$semibold"
              size="lg"
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
}