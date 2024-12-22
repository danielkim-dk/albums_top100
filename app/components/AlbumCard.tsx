'use client';
import Link from 'next/link';
import { memo } from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FavoriteButton from './FavoriteButton';
import AlbumImage from './AlbumImage';
import { BaseAlbumProps } from '@/app/types/album';

interface AlbumCardProps extends BaseAlbumProps {
  priority?: boolean;
  index: number;
}

const AlbumCard = memo(function AlbumCard({
  id,
  title,
  artist,
  imageUrl,
  index,
  link,
  priority = false,
}: AlbumCardProps) {
  return (
    <Card className="flex flex-row md:flex-col w-full ">
      <Link
        href={link}
        target="_blank"
        className="flex p-4 hover:opacity-90 transition-opacity items-center justify-center"
      >
        <AlbumImage
          imageUrl={imageUrl}
          title={title}
          artist={artist}
          priority={priority}
        />
      </Link>
      <div className="flex flex-col flex-1 min-w-0">
        <CardHeader className="p-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 text-sm font-medium text-muted-foreground">
              #{index}
            </span>
            <div className="min-w-0">
              <CardTitle className="text-lg font-semibold truncate">
                <Link href={link} target="_blank" className="hover:underline">
                  {title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground truncate">
                {artist}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="mt-auto p-4 pt-0 flex justify-between items-center gap-2">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-black text-white hover:bg-white hover:text-black h-9 px-4 py-2"
          >
            Listen
          </Link>
          <FavoriteButton id={id} />
        </CardFooter>
      </div>
    </Card>
  );
});

AlbumCard.displayName = 'AlbumCard';

export default AlbumCard;
