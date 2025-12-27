import React, { useEffect, useState } from 'react';
import {  Pressable, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Skeleton } from '../../components/ui/skeleton';

export default function AllCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const json = await res.json();
        const cats = json?.categories || [];
        const mapped = cats.map(c => ({
          id: c.strCategory.toLowerCase(),
          label: c.strCategory,
          icon: { uri: c.strCategoryThumb },
          description: c.strCategoryDescription
        }));
        setCategories(mapped);
      } catch (e) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box flex={1} bg="$white" px="$4" py="$12">
        <HStack alignItems="center" justifyContent="space-between" mb="$4">
          <HStack alignItems="center">
            <Skeleton variant="circular" className="h-10 w-10 mr-2" startColor="bg-gray-200" />
            <Skeleton variant="rounded" className="h-6 w-32" startColor="bg-gray-200" />
          </HStack>
          <Skeleton variant="rounded" className="h-4 w-16" startColor="bg-gray-200" />
        </HStack>
        
        <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Box 
              key={item} 
              width={160} 
              height={120} 
              borderRadius={12} 
              bg="$white" 
              borderWidth={1} 
              borderColor="$coolGray200" 
              justifyContent="center" 
              alignItems="center" 
              mb="$3"
            >
              <Skeleton variant="rounded" className="h-16 w-16 mb-2" startColor="bg-gray-200" />
              <Skeleton variant="rounded" className="h-4 w-20" startColor="bg-gray-200" />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb="$4">
        <Box flexDirection="row" alignItems="center">
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <Text size="lg" fontWeight="$bold" ml="$2">All Categories</Text>
        </Box>
        <Text color="#00A86B" fontWeight="$medium">{categories.length} items</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {categories.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => router.push(`/filter/categories/${c.id}`)} activeOpacity={0.85} style={{ marginBottom: 12 }}>
              <Box width={160} height={120} borderRadius={12} bg="$white" borderWidth={1} borderColor="$coolGray200" justifyContent="center" alignItems="center">
                <Image source={c.icon} style={{ width: 64, height: 64, resizeMode: 'contain', marginBottom: 8 }} />
                <Text fontWeight="$bold">{c.label}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
