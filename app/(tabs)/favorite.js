import React from 'react';
import { ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Box, Text, Pressable, VStack } from '@gluestack-ui/themed';
import { Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../context/FavoritesContext';
import { Skeleton } from '../../components/ui/skeleton';

export default function FavoriteScreen() {
  const router = useRouter();
  const { favorites, loading, removeFavorite } = useFavorites();

  const handleRemove = async (recipeId) => {
    await removeFavorite(recipeId);
  };

  if (loading) {
    return (
      <Box flex={1} bg="white" px="$5" pt="$12">
        {/* Header Skeleton */}
        <Text size="2xl" fontWeight="$bold">My Favorites</Text>
        <Skeleton 
          variant="rounded" 
          style={{ width: 100, height: 16, borderRadius: 6, marginTop: 8, marginBottom: 16 }} 
        />
        
        {/* Recipe Cards Skeleton */}
        <VStack>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              bg="white"
              borderRadius="$xl"
              overflow="hidden"
              mb="$4"
              borderWidth={1}
              borderColor="$coolGray200"
              shadowColor="$coolGray300"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={8}
              elevation={3}
            >
              {/* Image Skeleton */}
              <Box position="relative">
                <Skeleton 
                  variant="sharp" 
                  style={{ width: '100%', height: 180 }} 
                />
                {/* Heart Button Skeleton */}
                <Box position="absolute" top="$3" right="$3">
                  <Skeleton 
                    variant="circular" 
                    style={{ width: 40, height: 40, borderRadius: 20 }} 
                  />
                </Box>
              </Box>
              
              {/* Text Skeleton */}
              <VStack p="$4" space="sm">
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 200, height: 20, borderRadius: 6 }} 
                />
                <Skeleton 
                  variant="rounded" 
                  style={{ width: 100, height: 14, borderRadius: 4, marginTop: 4 }} 
                />
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="white">
      <Box px="$5" pt="$12" pb="$4">
        <Text size="2xl" fontWeight="$bold">My Favorites</Text>
        <Text color="$coolGray400" mt="$1">
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
        </Text>
      </Box>

      {favorites.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center" px="$6">
          <Heart size={64} color="#E5E5E5" />
          <Text size="lg" fontWeight="$semibold" mt="$4" textAlign="center">
            No favorites yet
          </Text>
          <Text color="$coolGray400" mt="$2" textAlign="center">
            Start exploring recipes and tap the heart icon to save your favorites!
          </Text>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/home')}
            style={{ marginTop: 24 }}
          >
            <Box bg="#00A86B" px="$6" py="$3" borderRadius="$full">
              <Text color="white" fontWeight="$semibold">Explore Recipes</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        >
          {favorites.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              activeOpacity={0.9}
              onPress={() => router.push(`/filter/recipes/${recipe.id}`)}
            >
              <Box
                bg="white"
                borderRadius="$xl"
                overflow="hidden"
                mb="$4"
                borderWidth={1}
                borderColor="$coolGray200"
                shadowColor="$coolGray300"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={8}
                elevation={3}
              >
                <Box position="relative">
                  <Image
                    source={typeof recipe.image === 'string' ? { uri: recipe.image } : recipe.image}
                    style={{ width: '100%', height: 180 }}
                    resizeMode="cover"
                  />
                  
                  {/* Remove from favorites button */}
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      handleRemove(recipe.id);
                    }}
                    position="absolute"
                    top="$3"
                    right="$3"
                    bg="white"
                    p="$2"
                    borderRadius="$full"
                    shadowColor="$black"
                    shadowOffset={{ width: 0, height: 2 }}
                    shadowOpacity={0.2}
                    shadowRadius={4}
                    elevation={3}
                  >
                    <Heart size={22} color="#FF4757" fill="#FF4757" />
                  </Pressable>
                </Box>

                <Box p="$4">
                  <Text fontSize="$lg" fontWeight="$bold" mb="$1" color="$coolGray800" numberOfLines={1}>
                    {recipe.title}
                  </Text>
                  <Text fontSize="$sm" color="$coolGray500">
                    {recipe.by}
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Box>
  );
}