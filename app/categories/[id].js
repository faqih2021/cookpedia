import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryDetail() {
  const params = useLocalSearchParams();
  const { id } = params;
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const catJson = await catRes.json();
        const cats = catJson?.categories || [];
        const foundCat = cats.find(c => c.strCategory.toLowerCase() === id?.toLowerCase());
        
        if (foundCat) {
          setCategory({
            id: foundCat.strCategory.toLowerCase(),
            label: foundCat.strCategory,
            icon: { uri: foundCat.strCategoryThumb },
            description: foundCat.strCategoryDescription
          });

          const recRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foundCat.strCategory}`);
          const recJson = await recRes.json();
          const meals = recJson?.meals || [];
          
          const mapped = meals.map(m => ({
            id: m.idMeal,
            title: m.strMeal,
            image: { uri: m.strMealThumb }
          }));
          
          setRecipes(mapped);
        }
      } catch (e) {
        setCategory(null);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box flex={1} bg="$white" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00A86B" />
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white">
      <SafeAreaView style={{ flex: 1 }}>
        <Box px="$5" flex={1}>
          <Box flexDirection="row" alignItems="center" mb="$4" pt="$2">
            <Pressable 
              onPress={() => router.back()} 
              style={{ padding: 8, marginRight: 12 }}
            >
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Box flex={1}>
              <Text size="xl" fontWeight="$bold">{category ? category.label : 'Category'}</Text>
            </Box>
            <Text color="#00A86B" fontWeight="$medium">{recipes.length} recipes</Text>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
          <Box borderRadius={14} overflow="hidden" mb="$4">
            <Image 
              source={category?.icon || require('../../assets/breakfast.png')} 
              style={{ width: '100%', height: 200, resizeMode: 'cover' }} 
            />
          </Box>

            <Text size="lg" fontWeight="$bold" mb="$3">Recipes in {category?.label || 'Category'}</Text>
            
            {recipes.length > 0 ? (
              <Box pb="$6">
                {recipes.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    onPress={() => router.push(`/recipes/${item.id}`)} 
                    activeOpacity={0.8}
                  >
                    <Box 
                      flexDirection="row" 
                      mb="$3" 
                      alignItems="center"
                      bg="$white"
                      borderRadius={12}
                      borderWidth={1}
                      borderColor="$coolGray100"
                      overflow="hidden"
                    >
                      <Image 
                        source={item.image} 
                        style={{ width: 100, height: 80 }} 
                      />
                      <Box flex={1} px="$3" py="$2">
                        <Text fontWeight="$bold" numberOfLines={2}>{item.title}</Text>
                        <Text color="$coolGray400" fontSize="$sm" mt="$1">{category?.label}</Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Box>
            ) : (
              <Box alignItems="center" py="$8">
                <Text color="$coolGray400">No recipes found in this category</Text>
              </Box>
            )}
          </ScrollView>
        </Box>
      </SafeAreaView>
    </Box>
  );
}

