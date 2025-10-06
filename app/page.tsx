'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleThailandClick = () => {
    router.push('/thailand');
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* World Map Container - Full Screen Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/map3.PNG"
          alt="World Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title - Floating over map */}
      <div className="absolute top-8 md:top-12 left-0 right-0 z-30 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl curved-text">
          GLOBEVIBE
        </h1>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Thailand clickable area (invisible but interactive) */}
          <div
            className="absolute cursor-pointer transition-all duration-300 z-20"
            style={{
              left: '74%',
              top: '47%',
              width: '100px',
              height: '120px',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleThailandClick}
          />

          {/* Thailand Label (shown on hover) */}
          {hovered && (
            <div className="absolute left-[74%] top-[38%] transform -translate-x-1/2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-2xl font-semibold text-sm md:text-xl animate-in fade-in zoom-in duration-200 z-40 border-2 border-white" style={{ fontFamily: 'var(--font-baloo)' }}>
              Click to explore Thailand! 🇹🇭
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] md:border-l-[10px] border-r-[8px] md:border-r-[10px] border-t-[8px] md:border-t-[10px] border-transparent border-t-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* Instruction - Floating at bottom */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 text-center px-4">
        <p className="text-sm md:text-lg font-baloo text-white font-medium animate-pulse drop-shadow-lg" style={{ fontFamily: 'var(--font-baloo)' }}>
          👆 Click on Thailand to begin your cultural journey
        </p>
      </div>
    </main>
  );
}
