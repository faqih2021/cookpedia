import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CountryFilterResult from '../../../components/filter/CountryFilterResult';

export default function CountriesResultPage() {
  const router = useRouter();
  const { country } = useLocalSearchParams();
  
  const selectedCountry = country || 'Unknown';

  const handleGoBack = () => {
    router.replace('/(tabs)/filter');
  };

  return (
    <CountryFilterResult 
      selectedCountry={selectedCountry}
      onGoBack={handleGoBack}
    />
  );
}