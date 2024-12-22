import Link from 'next/link';
import LandingBackground from './components/LandingBackground';
import LandingHeroBanner from './components/LandingHeroBanner';

export default function LandingPage() {
  return (
    <div>
      <Link href="/home">
        <LandingBackground />

        <LandingHeroBanner />
      </Link>
    </div>
  );
}
