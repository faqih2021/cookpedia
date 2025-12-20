import React from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '../../datas';

export default function Categories({ categories = CATEGORIES, selected, onSelect }) {
	const router = useRouter();
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
								router.push(`/categories/${c.id}`);
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
									<Image
										source={c.icon}
										style={{ width: 36, height: 36, resizeMode: 'contain' }}
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