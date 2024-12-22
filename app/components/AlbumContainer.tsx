'use client';
import { useEffect, useState } from 'react';
import { useAlbums } from '@/app/context/AlbumsContext';
import AlbumGrid from './AlbumGrid';
import { Album } from '@/app/types/album';
import Searchbar from './Searchbar';

interface AlbumContainerProps {
  children?: React.ReactNode;
  initialAlbums?: Album[];
  title?: string;
}

export default function AlbumContainer({
  children,
  initialAlbums,
  title,
}: AlbumContainerProps) {
  const { filteredAlbums, loading, error, setSearchTerm } = useAlbums();
  const [displayedAlbums, setDisplayedAlbums] = useState<Album[]>([]);

  // Update displayed albums when filtered albums change
  useEffect(() => {
    const albumsToDisplay = initialAlbums || filteredAlbums;
    if (!albumsToDisplay) return;

    const withIndices = albumsToDisplay.map((album: Album, index) => ({
      ...album,
      originalIndex: album.originalIndex || index + 1,
    }));

    setDisplayedAlbums(withIndices);
  }, [initialAlbums, filteredAlbums]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col container mx-auto px-4 py-8">
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      {children}
      <div className="flex justify-center">
        <div className="w-full max-w-xl mb-8">
          <Searchbar
            onSearch={setSearchTerm}
            placeholder="Search by album or artist..."
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : (
        <AlbumGrid albums={displayedAlbums} />
      )}
    </div>
  );
}
