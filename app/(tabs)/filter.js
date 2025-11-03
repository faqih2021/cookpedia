import { Box, Text, VStack } from '@gluestack-ui/themed';

export default function FilterScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space="md" alignItems="center">
        <Text size="2xl" fontWeight="$bold">Filter</Text>
        <Text color="$coolGray400">Rafi</Text>
      </VStack>
    </Box>
  );
}