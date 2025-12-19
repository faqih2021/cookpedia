import React, { useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function Recommendation() {
	const router = useRouter();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

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
			<Box mb="$4" justifyContent="center" alignItems="center" height={180}>
				<ActivityIndicator size="small" color="#00A86B" />
			</Box>
		);
	}

	return (
		<Box mb="$4">
			<Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$3" px="$1">
				<Text size="lg" fontWeight="$bold">Recommendation</Text>
				<TouchableOpacity 
					onPress={() => router.push({ pathname: '/recommendations', params: { items: JSON.stringify(items) } })}
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
						onPress={() => router.push(`/recipes/${it.id}`)}
					>
						<Box width={200} borderRadius={14} bg="$white" overflow="hidden" 
							shadowColor="$coolGray300" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.1} shadowRadius={4} elevation={2}>
							<Image source={it.image} style={{ width: '100%', height: 140, resizeMode: 'cover' }} />
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