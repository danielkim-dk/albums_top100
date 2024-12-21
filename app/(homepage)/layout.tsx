import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
	title: "The Beats Chart Top 100",
	description: "Get the current top 100 albums on the Beats Chart",
};

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col items-center w-full justify-center">
			<Navbar />
			<div className="flex flex-col items-center justify-center sm:w-[80%] sm:max-w-[1200px]">
				{children}
			</div>
		</div>
	);
}
