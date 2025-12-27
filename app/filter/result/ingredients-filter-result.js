import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import IngredientsFilterResult from '../../../components/filter/IngredientsFilterResult';

export default function IngredientsResultPage() {
  const router = useRouter();
  const { ingredient } = useLocalSearchParams();
  
  const selectedIngredient = typeof ingredient === 'string' 
    ? ingredient 
    : (ingredient || 'Chicken');

  const handleGoBack = () => {
    router.replace('/(tabs)/filter');
  };

  return (
    <IngredientsFilterResult 
      selectedIngredient={selectedIngredient}
      onGoBack={handleGoBack}
    />
  );
}