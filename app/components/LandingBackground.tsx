import React from 'react';
import Image from 'next/image';

const LandingBackground = () => {
  return (
    <>
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
    </>
  );
};

export default LandingBackground;
