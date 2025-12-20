import React, { useRef } from 'react';
import { Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

// import komponen filter
import FilterTabs from '../../components/filter/FilterTabs';
import IngredientFilter from '../../components/filter/IngredientFilter';
import CountryFilter from '../../components/filter/CountryFilter';
import CategoryFilter from '../../components/filter/CategoryFilter';
import useFilterState from '../../hooks/useFilterState';


export default function FilterScreen() {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  
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

  // handle select
  const handleIngredientSelect = (ingredientId, ingredientName) => {
    if (isNavigatingRef.current) return; // biar ga double klik
    
    isNavigatingRef.current = true;
    selectIngredient(ingredientId);
    
    router.push(`/filter/result/ingredients-filter-result?ingredients=${encodeURIComponent(selectedIngredientName)}`);
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  const handleCountrySelect = (countryId, countryName) => {
    if (isNavigatingRef.current) return; 
    
    isNavigatingRef.current = true;
    handleCountrySelection(countryName);
    
    router.push(`/filter/result/countries-filter-result?country=${encodeURIComponent(country)}`);
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
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

  function handleCategorySelect(categoryId, categoryName) {
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    handleCategorySelection(categoryName);
    
    router.push(`/result/category-filter-result?category=${encodeURIComponent(categoryName)}`);
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  }
}