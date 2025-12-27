import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Box, Text, HStack, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Skeleton } from '../ui/skeleton';
import { ImageOff } from 'lucide-react-native';

// Component untuk menampilkan gambar dengan error handling
function CategoryImage({ source, style, active }) {
	const [error, setError] = useState(false);

	if (error || !source?.uri) {
		return (
			<Box style={[style, { backgroundColor: active ? 'rgba(255,255,255,0.2)' : '#F3F4F6', justifyContent: 'center', alignItems: 'center' }]}>
				<ImageOff size={18} color={active ? '#fff' : '#9CA3AF'} />
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

export default function Categories({ selected, onSelect }) {
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
				const json = await res.json();
				const cats = json?.categories || [];
				const mapped = cats.slice(0, 6).map(c => ({
					id: c.strCategory.toLowerCase(),
					label: c.strCategory,
					icon: { uri: c.strCategoryThumb }
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
			<Box mb="$4">
				<HStack justifyContent="space-between" alignItems="center" mb="$2">
					<Skeleton 
						variant="rounded" 
						style={{ width: 90, height: 22, borderRadius: 6 }} 
					/>
					<Skeleton 
						variant="rounded" 
						style={{ width: 50, height: 16, borderRadius: 6 }} 
					/>
				</HStack>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<Box
							key={item}
							width={92}
							height={92}
							borderRadius={14}
							justifyContent="center"
							alignItems="center"
							bg="$white"
							borderWidth={1}
							borderColor="$coolGray100"
							mr="$3"
						>
							<Skeleton 
								variant="rounded" 
								style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 8 }} 
							/>
							<Skeleton 
								variant="rounded" 
								style={{ width: 56, height: 12, borderRadius: 4 }} 
							/>
						</Box>
					))}
				</ScrollView>
			</Box>
		);
	}

	return (
		<Box mb="$4">
			<Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$2">
				<Text size="lg" fontWeight="$bold">Categories</Text>
				<TouchableOpacity onPress={() => router.push('/home/categories')}>
					<Text color="#00A86B">See all</Text>
				</TouchableOpacity>
			</Box>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: 8 }}
			>
				{categories.map((c) => {
					const active = selected === c.id;
					return (
						<TouchableOpacity
							key={c.id}
							onPress={() => {
								onSelect && onSelect(c.id);
								router.push(`/filter/categories/${c.id}`);
							}}
							activeOpacity={0.85}
							style={{ marginRight: 12 }}
						>
							<Box
								width={92}
								height={92}
								borderRadius={14}
								justifyContent="center"
								alignItems="center"
								bg={active ? '#10B981' : '$white'}
								borderWidth={1}
								borderColor={active ? '#10B981' : '$coolGray200'}
							>
								<Box
									width={48}
									height={48}
									borderRadius={10}
									justifyContent="center"
									alignItems="center"
									mb="$2"
								>
									<CategoryImage
										source={c.icon}
										style={{ width: 36, height: 36, resizeMode: 'contain' }}
										active={active}
									/>
								</Box>

								<Text fontSize={13} color={active ? '$white' : '$coolGray800'} fontWeight={active ? '$bold' : undefined}>
									{c.label}
								</Text>
							</Box>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</Box>
	);
}