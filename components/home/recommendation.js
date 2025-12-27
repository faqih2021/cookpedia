import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text, Pressable, HStack, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Heart, ImageOff } from 'lucide-react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { Skeleton } from '../ui/skeleton';

// Component untuk menampilkan gambar dengan error handling
function RecipeImage({ source, style }) {
	const [error, setError] = useState(false);

	if (error || !source?.uri) {
		return (
			<Box style={[style, { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
				<ImageOff size={24} color="#9CA3AF" />
				<Text fontSize="$xs" color="$coolGray400" mt="$1">
					Image not found
				</Text>
			</Box>
		);
	}

	return (
		<Image 
			source={source}
			style={style}
			onError={() => setError(true)}
		/>
	);
}

export default function Recommendation() {
	const router = useRouter();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const { toggleFavorite, isFavorite } = useFavorites();

	const handleToggleFavorite = async (item, e) => {
		e.stopPropagation();
		await toggleFavorite({
			id: item.id,
			title: item.title,
			by: item.by,
			image: item.image.uri || item.image
		});
	};

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const promises = Array(5).fill(null).map(() =>
					fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
				);
				const results = await Promise.all(promises);
				
				const meals = results
					.map(r => r?.meals?.[0])
					.filter(Boolean)
					.map(meal => ({
						id: meal.idMeal,
						title: meal.strMeal,
						by: meal.strCategory || 'Unknown',
						image: { uri: meal.strMealThumb }
					}));
				
				setItems(meals);
			} catch (e) {
				setItems([]);
			} finally {
				setLoading(false);
			}
		};
		fetchRecommendations();
	}, []);

	if (loading) {
		return (
			<Box mb="$4">
				<HStack justifyContent="space-between" alignItems="center" mb="$3" px="$1">
					<Skeleton 
						variant="rounded" 
						style={{ width: 130, height: 22, borderRadius: 6 }} 
					/>
					<Skeleton 
						variant="rounded" 
						style={{ width: 50, height: 16, borderRadius: 6 }} 
					/>
				</HStack>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}>
					{[1, 2, 3].map((item) => (
						<Box 
							key={item} 
							width={200} 
							borderRadius={14} 
							overflow="hidden" 
							bg="$white" 
							mr="$4"
							borderWidth={1}
							borderColor="$coolGray100"
						>
							<Box position="relative">
								<Skeleton 
									variant="sharp" 
									style={{ width: '100%', height: 140 }} 
								/>
								<Box position="absolute" top={8} right={8}>
									<Skeleton 
										variant="circular" 
										style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6' }} 
									/>
								</Box>
							</Box>
							<VStack p="$3" space="sm">
								<Skeleton 
									variant="rounded" 
									style={{ width: 140, height: 16, borderRadius: 6 }} 
								/>
								<Skeleton 
									variant="rounded" 
									style={{ width: 80, height: 12, borderRadius: 4 }} 
								/>
							</VStack>
						</Box>
					))}
				</ScrollView>
			</Box>
		);
	}

	return (
		<Box mb="$4">
			<Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$3" px="$1">
				<Text size="lg" fontWeight="$bold">Recommendation</Text>
				<TouchableOpacity 
					onPress={() => router.push({ pathname: '/home/recommendations', params: { items: JSON.stringify(items) } })}
					style={{ paddingHorizontal: 8, paddingVertical: 4 }}
				>
					<Text color="#00A86B">See all</Text>
				</TouchableOpacity>
			</Box>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}>
				{items.map((it) => (
					<TouchableOpacity
						key={it.id}
						activeOpacity={0.9}
						style={{ marginRight: 16 }}
						onPress={() => router.push(`/filter/recipes/${it.id}`)}
					>
						<Box width={200} borderRadius={14} bg="$white" overflow="hidden" 
							shadowColor="$coolGray300" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.1} shadowRadius={4} elevation={2}>
							<Box position="relative">
								<RecipeImage source={it.image} style={{ width: '100%', height: 140, resizeMode: 'cover' }} />
								{/* Favorite Button */}
								<Pressable
									onPress={(e) => handleToggleFavorite(it, e)}
									position="absolute"
									top="$2"
									right="$2"
									bg="white"
									p="$1.5"
									borderRadius="$full"
									shadowColor="$black"
									shadowOffset={{ width: 0, height: 1 }}
									shadowOpacity={0.2}
									shadowRadius={2}
									elevation={2}
								>
									<Heart 
										size={18} 
										color={isFavorite(it.id) ? '#FF4757' : '#666'} 
										fill={isFavorite(it.id) ? '#FF4757' : 'transparent'} 
									/>
								</Pressable>
							</Box>
							<Box px="$3" py="$3">
								<Text fontWeight="$bold" numberOfLines={1}>{it.title}</Text>
								<Text color="$coolGray400" mt="$1" fontSize="$sm">{it.by}</Text>
							</Box>
						</Box>
					</TouchableOpacity>
				))}
			</ScrollView>
		</Box>
	);
}