'use client';

import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  url: string;
}

const videos: Video[] = [
  {
    id: 'hbcGx4MGUMg',
    title: 'Thailand Culture & Traditions',
    url: 'https://www.youtube.com/embed/hbcGx4MGUMg'
  },
  {
    id: 'T1oayo4IRpE',
    title: 'Explore Beautiful Thailand',
    url: 'https://www.youtube.com/embed/T1oayo4IRpE'
  },
  {
    id: 'KsqaNkv57io',
    title: 'Amazing Thailand Experience',
    url: 'https://www.youtube.com/embed/KsqaNkv57io'
  }
];

export default function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(videos[0]);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-blue-100 to-white rounded-3xl p-4 shadow-2xl border-2 border-blue-200 relative overflow-hidden flex flex-col">
      {/* Cute glowing edge effect */}
      <div className="absolute inset-0 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.3)] pointer-events-none" />

      {/* Header */}
      <div className="mb-3 text-center relative z-10">
        <h2 className="text-xl font-bold text-blue-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
          🎥 Discover Thailand
        </h2>
        <p className="text-xs text-blue-500 font-medium">Watch these amazing videos!</p>
      </div>

      {/* Video Player */}
      <div className="mb-3 bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-blue-200 flex-shrink-0 relative z-10">
        {selectedVideo ? (
          <div className="relative" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={selectedVideo.url}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
            <div className="text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-blue-600 font-semibold text-sm">Select a video to watch!</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Thumbnails - Scrollable */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        <div className="space-y-2">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              className={`w-full bg-white rounded-xl p-2 flex items-center gap-3 transition-all duration-300 border-2 ${
                selectedVideo?.id === video.id
                  ? 'border-blue-400 shadow-lg scale-[1.02]'
                  : 'border-blue-100 hover:border-blue-300'
              } ${
                hoveredVideo === video.id
                  ? 'shadow-[0_4px_20px_rgba(59,130,246,0.4)] scale-[1.02]'
                  : 'shadow-md'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-blue-200 to-blue-100">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <div className="flex-1 text-left">
                <p className="text-blue-700 font-semibold text-xs leading-snug line-clamp-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {video.title}
                </p>
                {selectedVideo?.id === video.id && (
                  <span className="text-[10px] text-blue-500 font-medium mt-0.5 inline-block">
                    ▶ Now Playing
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #dbeafe;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #60a5fa;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}
