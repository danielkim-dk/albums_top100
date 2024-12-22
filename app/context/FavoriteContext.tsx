'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

interface FavoriteState {
  favorites: string[];
}

interface FavoriteContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const INITIAL_STATE: FavoriteState = {
  favorites: [],
};

const STORAGE_KEY = 'favorites';

// Singleton for cross-route state persistence
let globalState: FavoriteState | null = null;

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

function useFavoritesData() {
  const [state, setState] = useState<FavoriteState>(() => {
    // First check global state
    if (globalState) return globalState;

    // Then check localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const favorites = JSON.parse(saved);
          const loadedState = { favorites };
          globalState = loadedState;
          return loadedState;
        } catch (error) {
          localStorage.removeItem(STORAGE_KEY);
          throw error;
        }
      }
    }

    return INITIAL_STATE;
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
    globalState = state;
  }, [state]);

  const addFavorite = useCallback((id: string) => {
    setState((prev) => {
      if (prev.favorites.includes(id)) return prev;
      return { favorites: [...prev.favorites, id] };
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setState((prev) => ({
      favorites: prev.favorites.filter((favId) => favId !== id),
    }));
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return state.favorites.includes(id);
    },
    [state.favorites]
  );

  return {
    state,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { state, addFavorite, removeFavorite, isFavorite } = useFavoritesData();

  const contextValue: FavoriteContextType = {
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}
