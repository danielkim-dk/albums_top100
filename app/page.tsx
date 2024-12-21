import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
	return (
		<div>
			<Link href="/home">
				{/* Video Background - Hidden on small screens */}
				<video
					className="fixed top-0 left-0 w-full h-full object-cover z-[-1] hidden md:block"
					preload="auto"
					autoPlay
					playsInline
					controls={false}
					muted
					loop
				>
					<source src="/HeroVideo.mp4" type="video/mp4" />
					Your browser does not support the video tag
				</video>

				{/* Image Background - Shown only on small screens */}
				<div className="fixed top-0 left-0 w-full h-full z-[-1] block md:hidden">
					<Image
						src="/HeroBackgroundSmall.png"
						alt="Background"
						fill
						className="object-cover"
						priority
					/>
				</div>

				<div className="z-10 flex flex-col w-[100%] md:w-[50%] h-[100vh] items-center pt-[300px]">
					<h1 className="text-2xl font-bold text-white">
						The Beats Chart
					</h1>
					<p className="text-white pt-[25px] font-light text-md">
						Experience the Best of Music, One Album at a Time
					</p>
				</div>
			</Link>
		</div>
	);
}
