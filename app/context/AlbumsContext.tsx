'use client';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { usePathname } from 'next/navigation';
import { Album } from '@/app/types/album';

interface AlbumWithRank extends Album {
  originalRank: number;
}

interface AlbumsState {
  albums: AlbumWithRank[];
  filteredAlbums: AlbumWithRank[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
}

interface AlbumsContextType extends AlbumsState {
  setSearchTerm: (term: string) => void;
}

const INITIAL_STATE: AlbumsState = {
  albums: [],
  filteredAlbums: [],
  loading: true,
  error: null,
  searchTerm: '',
};

const CACHE_KEY = 'albums_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

// Singleton for cross-route state persistence
let globalState: AlbumsState | null = null;

const AlbumsContext = createContext<AlbumsContextType | undefined>(undefined);

function useAlbumsData() {
  const [state, setState] = useState<AlbumsState>(
    () => globalState || INITIAL_STATE
  );
  const pathname = usePathname();

  const updateState = useCallback((updates: Partial<AlbumsState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      globalState = newState;
      return newState;
    });
  }, []);

  // Reset search state on route change
  useEffect(() => {
    updateState({
      searchTerm: '',
      filteredAlbums: state.albums,
    });
  }, [pathname, state.albums, updateState]);

  const addRankToAlbums = useCallback((albums: Album[]): AlbumWithRank[] => {
    return albums.map((album, index) => ({
      ...album,
      originalRank: index + 1,
    }));
  }, []);

  const fetchAlbums = useCallback(async () => {
    // Check memory cache first
    if (globalState?.albums.length) {
      setState(globalState);
      return;
    }

    // Check localStorage cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        const rankedAlbums = addRankToAlbums(data.feed.entry);
        updateState({
          albums: rankedAlbums,
          filteredAlbums: rankedAlbums,
          loading: false,
        });
        return;
      }
      localStorage.removeItem(CACHE_KEY);
    }

    // Fetch fresh data
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();

      // Cache the response
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );

      const rankedAlbums = addRankToAlbums(data.feed.entry);
      updateState({
        albums: rankedAlbums,
        filteredAlbums: rankedAlbums,
        loading: false,
      });
    } catch (error) {
      updateState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unknown error occurred'),
      });
    }
  }, [updateState, addRankToAlbums]);

  // Filter albums when search term changes
  useEffect(() => {
    if (!state.albums.length) return;

    const filtered = state.searchTerm
      ? state.albums.filter((album) => {
          const searchTerm = state.searchTerm.toLowerCase();
          return (
            album['im:name'].label.toLowerCase().includes(searchTerm) ||
            album['im:artist'].label.toLowerCase().includes(searchTerm)
          );
        })
      : state.albums;

    updateState({ filteredAlbums: filtered });
  }, [state.albums, state.searchTerm, updateState]);

  return {
    state,
    fetchAlbums,
    updateState,
  };
}

export function AlbumsProvider({ children }: { children: React.ReactNode }) {
  const { state, fetchAlbums, updateState } = useAlbumsData();

  // Load albums on mount
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const contextValue: AlbumsContextType = {
    ...state,
    setSearchTerm: useCallback(
      (term: string) => updateState({ searchTerm: term }),
      [updateState]
    ),
  };

  return (
    <AlbumsContext.Provider value={contextValue}>
      {children}
    </AlbumsContext.Provider>
  );
}

export function useAlbums() {
  const context = useContext(AlbumsContext);
  if (!context) {
    throw new Error('useAlbums must be used within an AlbumsProvider');
  }
  return context;
}
