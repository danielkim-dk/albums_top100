'use client';
import { memo, useContext, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import HeartIcon from './HeartIcon';
import { useFavorites } from '@/app/context/FavoriteContext';

interface FavoriteButtonProps {
  id: string;
}

const FavoriteButton = memo(({ id }: FavoriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(id);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent event bubbling
    if (isCurrentlyFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }, [id, isCurrentlyFavorite, addFavorite, removeFavorite]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className="hover:bg-transparent"
    >
      <HeartIcon filled={isCurrentlyFavorite} />
    </Button>
  );
});

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;
