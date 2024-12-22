'use client';

import { useState, useEffect } from 'react';

const phrases = ['Experience the Best Music', 'One Album at a Time'];

const LandingHeroBanner = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Toggle visibility every 2 seconds, changing phrase when hidden
    const interval = setInterval(() => {
      setIsVisible(false);

      // Wait for fade out animation to complete before changing text
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 500); // Half of the transition duration
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="z-10 flex flex-col w-[100%] h-[100vh] items-center justify-end pt-[300px] static">
        <h1 className="text-7xl sm:text-9xl font-bold text-white w-full h-fit  absolute top-10 sm:top-0 p-4">
          The
          <br /> <em>Beats</em>
          <br /> Chart
        </h1>
        <p
          className={`
          text-white pt-[25px] font-light text-xl md:text-2xl
          transition-opacity duration-1000 w-full p-4 mb-8
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        >
          {phrases[currentPhraseIndex]}
        </p>
      </div>
    </>
  );
};

export default LandingHeroBanner;
