import { Box, Text, VStack } from '@gluestack-ui/themed';

export default function SearchScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="white">
      <VStack space="md" alignItems="center">
        <Text size="2xl" fontWeight="$bold">Search</Text>
        <Text color="$coolGray400">Faqih</Text>
      </VStack>
    </Box>
  );
}