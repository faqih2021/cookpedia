import React, { useEffect, useState } from 'react';
import {  Pressable, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

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
      <Box flex={1} bg="$white" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00A86B" />
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$4" py="$12">
      <Box flexDirection="row" alignItems="center" mb="$4" gap="$3">
         <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
                              <ArrowLeft size={24} color="#000" />
                </Pressable>
        <Text size="lg" fontWeight="$bold">All Categories</Text>
       <Text color="#00A86B" ml="$2">
        {categories.length} items
      </Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between" gap="$3">
          {categories.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => router.push(`/categories/${c.id}`)} activeOpacity={0.85} style={{ marginBottom: 16, width: '47%' }}>
              <Box height={140} borderRadius={16} bg="$white" borderWidth={1} borderColor="$coolGray200" justifyContent="center" alignItems="center" py="$4">
                <Image source={c.icon} style={{ width: 70, height: 70, resizeMode: 'contain', marginBottom: 12 }} />
                <Text fontWeight="$bold" fontSize="$md">{c.label}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
