'use client';

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RetroIPod from '../../components/RetroIPod';

interface LocationData {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: number;
  description: string;
  history: string;
  tips: string;
  character: {
    message: string;
    x: number;
    y: number;
  };
  nextLocation: string;
}

const locationsData: Record<string, LocationData> = {
  'doi-suthep': {
    id: 'doi-suthep',
    name: 'Wat Phra That Doi Suthep Ratchaworawihan',
    city: 'Chiang Mai',
    category: 'Architecture',
    rating: 4.7,
    description: 'A stunning Buddhist temple perched on Doi Suthep mountain, offering breathtaking views of Chiang Mai city.',
    history: 'Built in 1383, this sacred temple is one of northern Thailand\'s most revered Buddhist sites. Legend tells of a white elephant carrying a Buddha relic that chose this spot by trumpeting three times and dying.',
    tips: 'Visit early morning to avoid crowds. Climb the 309 steps or take the cable car. Dress modestly - shoulders and knees covered.',
    character: {
      message: 'Welcome to Doi Suthep! Did you know the golden chedi contains sacred relics of Buddha? The temple glows magnificently at sunset!',
      x: 60,
      y: 40
    },
    nextLocation: 'natural-history'
  },
  'natural-history': {
    id: 'natural-history',
    name: 'Natural History Museum, AP.S.T., Khon Kaen University',
    city: 'Khon Kaen',
    category: 'Museums',
    rating: 4.5,
    description: 'A fascinating museum showcasing Thailand\'s natural heritage, with impressive dinosaur fossils and geological exhibits.',
    history: 'Established to preserve and display the rich paleontological discoveries from northeastern Thailand, including the famous Phu Wiang dinosaur fossils.',
    tips: 'Allow 2-3 hours for your visit. Photography is allowed in most areas. Great for families with children.',
    character: {
      message: 'Hello explorer! This region was once home to dinosaurs millions of years ago. The fossils you see here tell stories of ancient Thailand!',
      x: 70,
      y: 40
    },
    nextLocation: 'yaowarat'
  },
  'yaowarat': {
    id: 'yaowarat',
    name: 'Yaowarat Walking Street',
    city: 'Bangkok',
    category: 'Community',
    rating: 4.6,
    description: 'Bangkok\'s vibrant Chinatown, famous for its incredible street food, gold shops, and bustling atmosphere.',
    history: 'Established in 1891 during King Rama V\'s reign, Yaowarat has been the heart of Bangkok\'s Chinese community for over 130 years.',
    tips: 'Best visited in the evening when the street food stalls open. Try the famous pad thai and mango sticky rice. Bring cash!',
    character: {
      message: 'Sawatdee! Welcome to the heart of Bangkok\'s Chinatown! The best time to explore is after sunset when the food vendors set up. Try everything!',
      x: 30,
      y: 60
    },
    nextLocation: 'lamai-beach'
  },
  'lamai-beach': {
    id: 'lamai-beach',
    name: 'Lamai Beach, Koh Samui',
    city: 'Surat Thani',
    category: 'Nature',
    rating: 4.3,
    description: 'A beautiful sandy beach on Koh Samui island, perfect for swimming, sunbathing, and water sports.',
    history: 'Lamai Beach is Koh Samui\'s second-largest beach, known for its laid-back atmosphere and the famous Hin Ta and Hin Yai rock formations.',
    tips: 'Visit the rock formations at low tide. Many beachfront restaurants offer fresh seafood. Rent a scooter to explore nearby waterfalls.',
    character: {
      message: 'Paradise found! The crystal-clear waters here are perfect for swimming. Don\'t miss the sunset - it\'s absolutely magical!',
      x: 70,
      y: 75
    },
    nextLocation: 'doi-suthep'
  }
};

export default function LocationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [showInfo, setShowInfo] = useState(false);
  const [showCharacterMessage, setShowCharacterMessage] = useState(false);
  const [showIPod, setShowIPod] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const location = locationsData[id];

  if (!location) {
    return <div className="flex items-center justify-center h-screen">Location not found</div>;
  }

  useEffect(() => {
    // Auto-play music when page loads
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(err => console.log('Auto-play prevented:', err));
    }
  }, [id]);

  const handleNext = () => {
    router.push(`/location/${location.nextLocation}`);
  };

  // Get background image based on location ID
  const getBackgroundImage = () => {
    switch (id) {
      case 'doi-suthep':
        return '/assets/watt2.PNG';
      case 'natural-history':
        return '/assets/museum.png';
      case 'yaowarat':
        return '/assets/yaowarat.PNG';
      case 'lamai-beach':
        return '/assets/beach2.PNG';
      default:
        return '';
    }
  };

  // Get music file based on location ID
  const getMusicFile = () => {
    switch (id) {
      case 'doi-suthep':
        return '/assets/music/Sunset at Wat Phra That Doi Suthep (Instrumental).mp3';
      case 'natural-history':
        return '/assets/music/museam music.mp3';
      case 'yaowarat':
        return '/assets/music/Yaowarat Neon Night (10s energetic intro).mp3';
      case 'lamai-beach':
        return '/assets/music/Lamai Beach Sunset with Birds.mp3';
      default:
        return '';
    }
  };

  const backgroundImage = getBackgroundImage();
  const musicFile = getMusicFile();

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
        style={{
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Hidden audio element */}
      {musicFile && (
        <audio ref={audioRef} loop>
          <source src={musicFile} type="audio/mpeg" />
        </audio>
      )}

      {/* iPod Interface Popup */}
      {showIPod && (
        <RetroIPod
          audioRef={audioRef}
          songName={location.name}
          onClose={() => setShowIPod(false)}
        />
      )}

      {/* Top Left: iPod Button */}
      <button
        onClick={() => setShowIPod(true)}
        className="absolute top-8 left-8 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 hover:scale-110 transition-all"
        title="Open Music Player"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
        </svg>
      </button>

      {/* Top Right: Back to Thailand Map Button */}
      <Link
        href="/thailand"
        className="absolute top-8 right-8 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 hover:scale-110 transition-all"
        title="Back to Thailand Map"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>

      {/* Left Side: Back Arrow */}
      <Link
        href="/thailand"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all"
        title="Back to Thailand Map"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Location Name - Bubble Font Style */}
      <div className="absolute top-8 left-0 right-0 z-20 flex justify-center">
        <h1
          className="text-3xl font-bold text-white leading-tight bubble-text"
          style={{
            fontFamily: 'Nunito, Comic Sans MS, cursive',
            textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000, 2px 2px 0px #000',
            letterSpacing: '0.5px'
          }}
        >
          {location.name}
        </h1>
      </div>

      {/* Info Toggle */}
      <div className="absolute top-32 left-6 z-20">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white/30 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl text-white text-sm font-semibold hover:bg-white/40 transition-all shadow-lg"
        >
          Info {showInfo ? '▲' : '▼'}
        </button>

        {/* Info Panel */}
        {showInfo && (
          <div className="mt-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 max-w-xs max-h-80 overflow-y-auto shadow-2xl">
            <div className="space-y-3 text-white">
              <div>
                <h3 className="font-bold text-sm mb-1.5">Description</h3>
                <p className="text-xs leading-relaxed">{location.description}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1.5">History</h3>
                <p className="text-xs leading-relaxed">{location.history}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1.5">Tips</h3>
                <p className="text-xs leading-relaxed">{location.tips}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/30">
                <span className="px-2 py-0.5 bg-blue-500/60 rounded-full text-xs font-semibold">
                  {location.category}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-sm">{location.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Icon Button */}
      <div
        className="absolute cursor-pointer z-20"
        style={{ left: `${location.character.x}%`, top: `${location.character.y}%` }}
        onClick={() => {
          setShowCharacterMessage(true);
          setTimeout(() => setShowCharacterMessage(false), 10000);
        }}
      >
        <div className="relative group">
          {/* Interactive Icon Image */}
          <div className="w-14 h-14 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
               style={{
                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(255, 255, 255, 0.3)',
                 border: '2px solid rgba(255, 255, 255, 0.5)'
               }}>
            <img
              src="/assets/icon3.PNG"
              alt="Information Guide"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist - show a soft colored circle
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">ℹ️</div>';
                }
              }}
            />
          </div>

          {/* Message Bubble */}
          {showCharacterMessage && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-lg rounded-3xl shadow-2xl p-5 z-30 border-2 border-white/60 animate-in fade-in zoom-in duration-300">
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-5 h-5 bg-gradient-to-br from-white/95 to-blue-50/95 border-r-2 border-b-2 border-white/60" />

              {/* Message content */}
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Local Guide</p>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed font-medium">{location.character.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </main>
  );
}
