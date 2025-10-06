'use client';

import { useState } from 'react';
import Link from 'next/link';
import YouTubeSection from '../components/YouTubeSection';
import ThaiNotepad from '../components/ThaiNotepad';

interface Location {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: number;
  x: number;
  y: number;
  image: string;
}

const locations: Location[] = [
  {
    id: 'doi-suthep',
    name: 'Wat Phra That Doi Suthep Ratchaworawihan',
    city: 'Chiang Mai',
    category: 'Architecture',
    rating: 4.7,
    x: 40,  // Moved left 2 blocks
    y: 15,
    image: '/assets/doi-suthep.png'
  },
  {
    id: 'natural-history',
    name: 'Natural History Museum, AP.S.T., Khon Kaen University',
    city: 'Khon Kaen',
    category: 'Museums',
    rating: 4.5,
    x: 58,
    y: 29,
    image: '/assets/museum.png'
  },
  {
    id: 'yaowarat',
    name: 'Yaowarat Walking Street',
    city: 'Bangkok',
    category: 'Community',
    rating: 4.6,
    x: 47,  // Moved left 1 block
    y: 43,
    image: '/assets/yaowarat.png'
  },
  {
    id: 'lamai-beach',
    name: 'Lamai Beach, Koh Samui',
    city: 'Surat Thani',
    category: 'Nature',
    rating: 4.3,
    x: 43,  // Moved left 1 block
    y: 70,  // Moved up 1 block
    image: '/assets/beach.png'
  }
];

export default function ThailandPage() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  return (
    <main className="relative w-full min-h-screen overflow-auto bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            🇹🇭 THAILAND
          </h1>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full hover:from-blue-500 hover:to-blue-600 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            ← Back to Globe
          </Link>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - YouTube Videos (Smaller) */}
          <div className="lg:col-span-3 h-[600px]">
            <YouTubeSection />
          </div>

          {/* Center Column - Thailand Map (Larger) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-blue-100 h-[600px] flex flex-col">
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                📍 Explore Beautiful Places
              </h2>

              <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Thailand Map Image */}
                  <img
                    src="/assets/thailand2.jpg"
                    alt="Thailand Map"
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
                  />

                  {/* Location Markers */}
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ left: `${location.x}%`, top: `${location.y}%` }}
                      onMouseEnter={() => setHoveredLocation(location)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    >
                      <Link href={`/location/${location.id}`}>
                        <div className="relative group">
                          {/* Pin Icon */}
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="drop-shadow-xl hover:scale-125 transition-all duration-300"
                          >
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                              fill="url(#gradient)"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#EF4444' }} />
                                <stop offset="100%" style={{ stopColor: '#DC2626' }} />
                              </linearGradient>
                            </defs>
                          </svg>

                          {/* Hover Card */}
                          {hoveredLocation?.id === location.id && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-40 bg-gradient-to-br from-pink-100 via-pink-50 to-white backdrop-blur-md rounded-2xl shadow-xl p-2 z-30 border-2 border-pink-300 animate-in fade-in zoom-in duration-200">
                              {/* Speech bubble tail */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-pink-300"></div>
                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-pink-100 absolute top-0 left-1/2 transform -translate-x-1/2 -mt-px"></div>
                              </div>

                              <div className="text-center">
                                <div className="mb-1">
                                  <span className="text-xl animate-bounce inline-block">✨</span>
                                </div>
                                <p className="text-pink-600 font-bold text-xs mb-0.5" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                  Click to explore!
                                </p>
                                <p className="text-pink-500 text-[10px] font-semibold line-clamp-2 leading-tight mb-1">
                                  {location.name}
                                </p>
                                <div className="flex items-center justify-center gap-1">
                                  <span className="px-1.5 py-0.5 bg-pink-200 text-pink-700 rounded-full text-[9px] font-bold">
                                    {location.category}
                                  </span>
                                  <div className="flex items-center gap-0.5 bg-yellow-100 px-1 py-0.5 rounded-full">
                                    <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="font-bold text-gray-800 text-[9px]">{location.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Thai Language Notepad (Smaller) */}
          <div className="lg:col-span-3 h-[600px]">
            <ThaiNotepad />
          </div>
        </div>
      </div>
    </main>
  );
}
