import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@cookpedia_favorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage
  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save favorites to AsyncStorage
  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Add recipe to favorites (newest first)
  const addFavorite = async (recipe) => {
    const exists = favorites.some(fav => fav.id === recipe.id);
    if (!exists) {
      const newFavorites = [{
        id: recipe.id,
        title: recipe.title,
        by: recipe.by,
        image: recipe.image,
        addedAt: new Date().toISOString()
      }, ...favorites];
      await saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  // Remove recipe from favorites
  const removeFavorite = async (recipeId) => {
    const newFavorites = favorites.filter(fav => fav.id !== recipeId);
    await saveFavorites(newFavorites);
  };

  // Toggle favorite status
  const toggleFavorite = async (recipe) => {
    const isFav = isFavorite(recipe.id);
    if (isFav) {
      await removeFavorite(recipe.id);
    } else {
      await addFavorite(recipe);
    }
    return !isFav;
  };

  // Check if recipe is favorited
  const isFavorite = useCallback((recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = async () => {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
      setFavorites([]);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    refreshFavorites: loadFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
