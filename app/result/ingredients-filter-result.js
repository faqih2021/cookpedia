import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import IngredientsFilterResult from '../../components/filter/IngredientsFilterResult';

export default function IngredientsResultPage() {
  const router = useRouter();
  const { ingredients } = useLocalSearchParams();
  
  // ambil parameter ingredients dari URL
  const selectedIngredient = typeof ingredients === 'string' 
    ? ingredients 
    : (ingredients || 'Unknown');

  const handleGoBack = () => {
    router.back();
  };

  return (
    <IngredientsFilterResult 
      selectedIngredient={selectedIngredient}
      onGoBack={handleGoBack}
    />
  );
}