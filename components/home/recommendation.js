import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { RECOMMENDATIONS } from '../../datas';

export default function Recommendation({ items = RECOMMENDATIONS }) {
	const router = useRouter();

	return (
		<Box mb="$4">
			<Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="$2">
				<Text size="lg" fontWeight="$bold">Recommendation</Text>
				<TouchableOpacity onPress={() => router.push('/recommendations')}>
					<Text color="#00A86B">See all</Text>
				</TouchableOpacity>
			</Box>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
				{items.map((it) => (
					<TouchableOpacity
						key={it.id}
						activeOpacity={0.9}
						style={{ marginRight: 12 }}
						onPress={() => router.push(`/recipes/${it.id}`)}
					>
						<Box width={240} borderRadius={14} bg="$white" overflow="hidden">
							<Image source={it.image} style={{ width: '100%', height: 140, resizeMode: 'cover' }} />
							<Box px="$3" py="$3">
								<Text fontWeight="$bold">{it.title}</Text>
								<Text color="$coolGray400" mt="$1">{it.by}</Text>
							</Box>
						</Box>
					</TouchableOpacity>
				))}
			</ScrollView>
		</Box>
	);
}