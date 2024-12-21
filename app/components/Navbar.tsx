import Link from "next/link";
import React from "react";

const navItems = [
	{
		name: "Top 100",
		href: "/home",
	},
	{
		name: "Favorites",
		href: "/favorites",
	},
];

const Navbar = () => {
	return (
		<nav className="flex w-full h-16 items-center justify-start border border-black bg-gray-400">
			<ul className="flex gap-4 items-start">
				{navItems.map((item) => (
					<li key={item.name}>
						<Link href={item.href}>{item.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
