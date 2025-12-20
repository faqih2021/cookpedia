import { Box, Text, VStack } from '@gluestack-ui/themed';

export default function FavoriteScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space="md" alignItems="center">
        <Text size="2xl" fontWeight="$bold">Favorite</Text>
        <Text color="$coolGray400">Favorite Screen</Text>
      </VStack>
    </Box>
  );
}