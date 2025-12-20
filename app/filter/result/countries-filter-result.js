import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CountryFilterResult from '../../../components/filter/countryFilterResult';

export default function CountriesResultPage() {
  const router = useRouter();
  const { country } = useLocalSearchParams();
  
  const selectedCountry = country || 'Unknown';

  const handleGoBack = () => {
    router.back();
  };

  return (
    <CountryFilterResult 
      selectedCountry={selectedCountry}
      onGoBack={handleGoBack}
    />
  );
}