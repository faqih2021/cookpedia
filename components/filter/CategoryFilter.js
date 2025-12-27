import React, { useEffect, useState } from 'react';
import { 
  VStack, 
  Text, 
  Pressable,
  ScrollView,
  Box
} from '@gluestack-ui/themed';
import { Image } from 'react-native';
import { Skeleton } from '../ui/skeleton';

export default function CategoryFilter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const json = await res.json();
        const cats = (json?.categories || []).map((cat, idx) => ({
          id: idx + 1,
          name: cat.strCategory,
          image: { uri: cat.strCategoryThumb },
          description: cat.strCategoryDescription
        }));
        setCategories(cats);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    if (onCategorySelect) onCategorySelect(category.id, category.name);
  };

  // Skeleton placeholder data untuk loading state
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <VStack flex={1} bg="#00A86B">
      <VStack p="$6" pt="$2" pb="$6">
        <Text fontSize="$3xl" fontWeight="$bold" color="white">
          Browse by Category
        </Text>
        <Text fontSize="$md" color="rgba(255,255,255,0.8)">
          Quick Explore with categories tags
        </Text>
      </VStack>
      
      {/* Daftar kategori */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      >
        <VStack space="md">
          {loading ? (
            // Skeleton items saat loading
            skeletonItems.map((item) => (
              <Box
                key={item}
                bg="white"
                borderRadius="$2xl"
                p="$4"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.15}
                shadowRadius={8}
                elevation={5}
              >
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 112, height: 24, borderRadius: 8 }} 
                />
                <Skeleton 
                  variant="circular" 
                  style={{ width: 60, height: 60, borderRadius: 30 }} 
                />
              </Box>
            ))
          ) : (
            // Data kategori sebenarnya
            categories.map((category) => (
              <Pressable
                key={category.id}
                bg="white"
                borderRadius="$2xl"
                p="$4"
                onPress={() => handleCategoryPress(category)}
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
            ))
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}