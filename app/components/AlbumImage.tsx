'use client';
import Image from 'next/image';
import { memo } from 'react';

interface AlbumImageProps {
  imageUrl: string;
  title: string;
  artist: string;
  priority?: boolean;
}

const AlbumImage = memo(function AlbumImage({
  imageUrl,
  title,
  artist,
  priority = false,
}: AlbumImageProps) {
  return (
    <div className="relative w-[100px] h-[100px] md:w-[170px] md:h-[170px] overflow-hidden rounded-md">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${title} by ${artist}`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100px, 170px"
          priority={priority}
        />
      ) : (
        <div
          className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"
          aria-label={`${title} by ${artist}`}
        >
          <span className="text-gray-400">No Image</span>
        </div>
      )}
    </div>
  );
});

export default AlbumImage;
