import { Box, Text, VStack } from '@gluestack-ui/themed';

export default function HomeScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space="md" alignItems="center">
        <Text size="2xl" fontWeight="$bold">Home</Text>
        <Text color="$coolGray400">Yoga</Text>
      </VStack>
    </Box>
  );
}