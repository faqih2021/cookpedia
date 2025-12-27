import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

import FilterTabs from '../../components/filter/FilterTabs';
import IngredientFilter from '../../components/filter/IngredientFilter';
import CountryFilter from '../../components/filter/CountryFilter';
import CategoryFilter from '../../components/filter/CategoryFilter';
import useFilterState from '../../hooks/useFilterState';


export default function FilterScreen() {
  const router = useRouter();
  
  const {
    // state yang dipake
    activeTab,
    selectedIngredient,
    selectedCountry,
    selectedCategory,
    
    // function actions
    setActiveTab,
    selectIngredient,
    handleCountrySelection,
    handleCategorySelection,
  } = useFilterState();

  const handleIngredientSelect = (ingredientId, ingredientName) => {
    selectIngredient(ingredientId);
    router.push(`/filter/result/ingredients-filter-result?ingredient=${encodeURIComponent(ingredientName)}`);
  };

  const handleCountrySelect = (countryId, countryName) => {
    handleCountrySelection(countryName);
    router.push(`/filter/result/countries-filter-result?country=${encodeURIComponent(countryName)}`);
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    handleCategorySelection(categoryName);
    router.push(`/filter/result/category-filter-result?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <Box flex={1} bg="white">
      <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'ingredient' && (
        <IngredientFilter
          selectedIngredient={selectedIngredient}
          onIngredientSelect={handleIngredientSelect}
        />
      )}
      
      {activeTab === 'area' && (
        <CountryFilter
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
      )}
      
      {activeTab === 'category' && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      )}
    </Box>
  );
}