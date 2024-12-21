import { useState, useCallback, useEffect } from 'react';

interface Album {
    "im:name": {
        label: string;
    };
    "im:artist": {
        label: string;
    };
}

export const useSearch = <T extends Album>(items: T[] | null, searchTerm: string) => {
    const [filteredItems, setFilteredItems] = useState<T[]>([]);

    useEffect(() => {
        if (!items) {
            setFilteredItems([]);
            return;
        }

        if (!searchTerm.trim()) {
            setFilteredItems(items);
            return;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = items.filter((item) => {
            const albumName = item["im:name"].label.toLowerCase();
            const artistName = item["im:artist"].label.toLowerCase();
            return albumName.includes(lowerSearchTerm) || artistName.includes(lowerSearchTerm);
        });

        setFilteredItems(filtered);
    }, [items, searchTerm]);

    return filteredItems;
};
