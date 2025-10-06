'use client';

import { useState, useEffect, useRef } from 'react';

interface RetroIPodProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  songName: string;
  onClose: () => void;
}

export default function RetroIPod({ audioRef, songName, onClose }: RetroIPodProps) {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(20).fill(0));
  const animationRef = useRef<number | undefined>(undefined);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio analyzer for visualizer
    if (audioRef.current && !analyzerRef.current) {
      try {
        // Check if audio element already has a source node
        if (!(audioRef.current as any).sourceNode) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyzer = audioContext.createAnalyser();
          const source = audioContext.createMediaElementSource(audioRef.current);

          source.connect(analyzer);
          analyzer.connect(audioContext.destination);
          analyzer.fftSize = 64;

          // Store the source node reference on the audio element to prevent re-creation
          (audioRef.current as any).sourceNode = source;

          analyzerRef.current = analyzer;
          audioContextRef.current = audioContext;
        }
      } catch (error) {
        console.log('Audio analyzer setup failed:', error);
      }
    }

    // Animate audio visualizer
    const animate = () => {
      if (analyzerRef.current && !isMuted) {
        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);

        // Sample 20 bars from the frequency data
        const step = Math.floor(dataArray.length / 20);
        const bars = Array.from({ length: 20 }, (_, i) => dataArray[i * step] || 0);
        setAudioData(bars);
      } else {
        setAudioData(new Array(20).fill(0));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioRef, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="relative w-80 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-2xl p-6 border-4 border-gray-400"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all"
        >
          ×
        </button>

        {/* iPod Screen */}
        <div className="bg-gradient-to-br from-green-200 via-green-100 to-green-50 rounded-2xl p-4 mb-6 border-2 border-gray-400" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}>
          {/* Song Name Display */}
          <div className="bg-gray-800 rounded-lg px-3 py-2 mb-3 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-green-400 font-mono text-sm font-bold tracking-wide">
                ♪ {songName} ♪
              </span>
            </div>
          </div>

          {/* Audio Visualizer */}
          <div className="flex items-end justify-center gap-1 h-20 bg-gray-900 rounded-lg p-2">
            {audioData.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-green-500 via-green-400 to-green-300 rounded-sm transition-all duration-100"
                style={{
                  height: `${Math.max(5, (value / 255) * 100)}%`,
                  opacity: isMuted ? 0.3 : 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Retro Text */}
        <div className="text-center mb-4">
          <p className="text-gray-700 font-bold text-lg" style={{ fontFamily: 'Courier New, monospace' }}>
            RETRO iPOD
          </p>
          <p className="text-gray-500 text-xs">Music Player</p>
        </div>

        {/* Volume Control */}
        <div className="bg-white/50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-semibold text-sm">Volume</span>
            <span className="text-gray-600 font-bold text-sm">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-3 bg-gray-300 rounded-full appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleMute}
            className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
            style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}
          >
            {isMuted ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Retro circular button decoration */}
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center" style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
            <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(to bottom, #f3f4f6, #d1d5db);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(to bottom, #f3f4f6, #d1d5db);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          border: none;
        }
      `}</style>
    </div>
  );
}
