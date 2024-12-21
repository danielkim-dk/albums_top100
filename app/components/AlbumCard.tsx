"use client";
import Image from "next/image";
import React from "react";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AlbumCardProps {
	title: string;
	artist: string;
	imageUrl: string;
	index: number;
	link: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
	title,
	artist,
	imageUrl,
	index,
	link,
}) => {
	return (
		<Card className="flex max-w-[500px] min-w-[350px] md:min-w-full md:flex-col items-center hover:bg-slate-200 hover:cursor-pointer">
			<div className="relative min-w-[100px] min-h-[100px]  md:w-[200px] md:h-[200px] m-4">
				<Image
					src={imageUrl}
					alt={`${title} by ${artist}`}
					fill
					className="object-cover"
				/>
			</div>
			<CardHeader>
				<p>#{index + 1}</p>
				<CardTitle>{title}</CardTitle>
				<CardDescription>by {artist}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Link href={link}>Listen</Link>
				<Button variant="ghost">
					<span className="material-symbols-outlined">favorite</span>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AlbumCard;
