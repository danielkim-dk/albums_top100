'use client';
import React, { useMemo } from 'react';
import { useFavorites } from '@/app/context/FavoriteContext';
import { useAlbums } from '@/app/context/AlbumsContext';
import AlbumContainer from '@/app/components/AlbumContainer';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { albums, loading, error } = useAlbums();

  const favoriteAlbums = useMemo(() => {
    if (!albums.length) return [];

    // Filter albums that are in favorites and add their current index
    return albums
      .map((album, index) => ({
        ...album,
        originalIndex: index + 1
      }))
      .filter(album => favorites.includes(album.id.attributes['im:id']));
  }, [albums, favorites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <AlbumContainer initialAlbums={favoriteAlbums} title="Your Favorites">
      {favoriteAlbums.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No favorites yet. Start adding some!</p>
        </div>
      )}
    </AlbumContainer>
  );
}
