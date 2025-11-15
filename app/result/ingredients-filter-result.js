import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import IngredientsFilterResult from '../../components/filter/IngredientsFilterResult';

export default function IngredientsResultPage() {
  const router = useRouter();
  const { ingredients } = useLocalSearchParams();
  
  // ambil parameter ingredients dari URL
  const selectedIngredients = typeof ingredients === 'string' 
    ? ingredients.split(',') 
    : [ingredients || 'Unknown'];

  const handleGoBack = () => {
    router.back();
  };

  return (
    <IngredientsFilterResult 
      selectedIngredients={selectedIngredients}
      onGoBack={handleGoBack}
    />
  );
}