import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CategoryFilterResult from '../../../components/filter/CategoryFilterResult';

export default function CategoryResultPage() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  
  const selectedCategory = category || 'Unknown';

  const handleGoBack = () => {
    router.replace('/(tabs)/filter');
  };

  return (
    <CategoryFilterResult 
      selectedCategory={selectedCategory}
      onGoBack={handleGoBack}
    />
  );
}
