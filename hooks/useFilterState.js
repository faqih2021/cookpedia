import { useState } from 'react';

export default function useFilterState() {
  const [activeTab, setActiveTab] = useState('ingredient');
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showCountryResult, setShowCountryResult] = useState(false);
  const [showCategoryResult, setShowCategoryResult] = useState(false);

  const selectIngredient = (ingredientId) => {
    setSelectedIngredient(ingredientId);
    setShowResults(true); // Direct navigation to results
  };

  const handleCountrySelection = (countryName) => {
    setSelectedCountry(countryName);
    setShowCountryResult(true);
  };

  const handleCategorySelection = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryResult(true);
  };

  const handleApply = () => {
    if (activeTab === 'ingredient') {
      setShowResults(true);
    }
  };

  const resetResults = () => {
    setShowResults(false);
    setShowCountryResult(false);
    setShowCategoryResult(false);
  };

  return {
    // States
    activeTab,
    selectedIngredient,
    selectedCountry,
    selectedCategory,
    showResults,
    showCountryResult,
    showCategoryResult,
    
    // Actions
    setActiveTab,
    selectIngredient,
    handleCountrySelection,
    handleCategorySelection,
    resetResults
  };
}