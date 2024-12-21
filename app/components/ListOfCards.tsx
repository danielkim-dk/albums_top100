"use client";
import React, { useState } from "react";
import AlbumCard from "./AlbumCard";
import useFetchData from "../hooks/useFetchData";
import Searchbar from "./Searchbar";
import { useSearch } from "../hooks/useSearch";

interface Album {
	"im:name": {
		label: string;
	};
	"im:artist": {
		label: string;
	};
	"im:image": Array<{
		label: string;
		attributes: {
			height: string;
		};
	}>;
	id: {
		attributes: {
			"im:id": string;
		};
	};
	link: [
		{
			attributes: {
				href: string;
			};
		}
	];
}

interface FetchResponse {
	feed: {
		entry: Album[];
	};
}

const ListOfCards: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { data, error, loading } = useFetchData<FetchResponse>("albums", () =>
		fetch("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
	);

	const filteredAlbums = useSearch(data?.feed?.entry ?? null, searchTerm);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!data?.feed?.entry) {
		return <div>No albums found</div>;
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<Searchbar
				onSearch={setSearchTerm}
				placeholder="Search by album or artist name..."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
				{filteredAlbums.map((album, index) => {
					console.log('Album data:', JSON.stringify(album, null, 2));
					return (
					<AlbumCard
						key={album.id.attributes["im:id"]}
						title={album["im:name"].label}
						artist={album["im:artist"].label}
						imageUrl={album["im:image"][2].label}
						link={album.link?.attributes?.href || album.link?.[0]?.attributes?.href || '#'}
						index={index}
					/>
				)})}
			</div>
		</div>
	);
};

export default ListOfCards;
