import React, { useRef } from 'react';
import { Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

// import komponen filter
import FilterTabs from '../../components/filter/FilterTabs';
import IngredientFilter from '../../components/filter/IngredientFilter';
import CountryFilter from '../../components/filter/CountryFilter';
import CategoryFilter from '../../components/filter/CategoryFilter';

// hook buat manage state
import useFilterState from '../../hooks/useFilterState';

// data ingredients
import { allIngredients } from '../../data/filterData';

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
  const handleIngredientSelect = (ingredientId) => {
    if (isNavigatingRef.current) return; // biar ga double klik
    
    isNavigatingRef.current = true;
    selectIngredient(ingredientId);
    const selectedIngredientName = allIngredients
      .find(ing => ing.id === ingredientId)?.name || 'Unknown';
    
    router.push(`/result/ingredients-filter-result?ingredients=${encodeURIComponent(selectedIngredientName)}`);
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  const handleCountrySelect = (country) => {
    if (isNavigatingRef.current) return; 
    
    isNavigatingRef.current = true;
    handleCountrySelection(country);
    
    router.push(`/result/countries-filter-result?country=${encodeURIComponent(country)}`);
    
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
          onCategorySelect={handleCategorySelection}
        />
      )}
    </Box>
  );
}