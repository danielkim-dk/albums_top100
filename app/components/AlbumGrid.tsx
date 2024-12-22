'use client';
import { memo } from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '@/app/types/album';

interface AlbumGridProps {
  albums: Album[];
}

const getImageUrl = (album: Album): string => {
  return (
    album['im:image']?.find((img) => img.attributes.height === '170')?.label ||
    album['im:image']?.[0]?.label ||
    ''
  );
};

const getLink = (album: Album): string => {
  return album.link?.attributes?.href || '#';
};

const AlbumGrid = memo(({ albums }: AlbumGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {albums.map((album, index) => (
        <AlbumCard
          key={album.id.attributes['im:id']}
          id={album.id.attributes['im:id']}
          title={album['im:name'].label}
          artist={album['im:artist'].label}
          imageUrl={getImageUrl(album)}
          index={album.originalIndex || index + 1}
          link={getLink(album)}
          priority={index < 6}
        />
      ))}
    </div>
  );
});

AlbumGrid.displayName = 'AlbumGrid';

export default AlbumGrid;
