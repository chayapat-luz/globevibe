'use client';

import { useState } from 'react';

interface ThaiWord {
  title: string;
  thai: string;
  pronunciation?: string;
}

const thaiWords: ThaiWord[] = [
  {
    title: 'How to say hello in Thai language',
    thai: 'Sawadee / สวัสดี',
    pronunciation: '(sa-wa-dee)'
  },
  {
    title: 'How to say thank you',
    thai: 'Khop khun / ขอบคุณ',
    pronunciation: '(kop-koon)'
  },
  {
    title: 'How to say goodbye',
    thai: 'La gon / ลาก่อน',
    pronunciation: '(laa-gon)'
  },
  {
    title: 'How to say I love Thailand',
    thai: 'Chan rak muang thai / ฉันรักเมืองไทย',
    pronunciation: '(chan-rak-mueang-thai)'
  },
  {
    title: 'How to say delicious',
    thai: 'Aroi / อร่อย',
    pronunciation: '(a-roi)'
  },
  {
    title: 'How to say beautiful',
    thai: 'Suay / สวย',
    pronunciation: '(suay)'
  },
  {
    title: 'How to say yes',
    thai: 'Chai / ใช่',
    pronunciation: '(chai)'
  },
  {
    title: 'How to say no',
    thai: 'Mai chai / ไม่ใช่',
    pronunciation: '(mai-chai)'
  }
];

export default function ThaiNotepad() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleSlideChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < thaiWords.length - 1) {
      handleSlideChange(currentIndex + 1);
    }
  };

  const currentWord = thaiWords[currentIndex];
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-3xl p-4 shadow-2xl relative flex flex-col overflow-hidden">
      {/* Paper shadow effect */}
      <div className="absolute inset-0 rounded-3xl shadow-[0_8px_30px_rgba(120,53,15,0.2)]" />

      {/* Pin sticker at top */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full shadow-lg border-3 border-amber-800 z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-amber-600 rounded-full" />
      </div>

      {/* Notepad content */}
      <div className="relative mt-6 flex-1 flex flex-col">
        {/* Title */}
        <div className="text-center mb-4 border-b-2 border-amber-300 pb-3 flex-shrink-0">
          <h2 className="text-xl font-bold text-amber-800 mb-1" style={{ fontFamily: 'Patrick Hand, cursive' }}>
            🇹🇭 Learn Thai Words
          </h2>
          <p className="text-xs text-amber-600 italic">
            Word {currentIndex + 1} of {thaiWords.length}
          </p>
        </div>

        {/* Single Word Display with Animation */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`w-full transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {/* Title */}
            <div className="mb-4 px-2">
              <h3
                className="text-base font-semibold text-amber-900 leading-snug text-center"
                style={{ fontFamily: 'Patrick Hand, cursive' }}
              >
                {currentWord.title}
              </h3>
            </div>

            {/* Thai word and pronunciation */}
            <div className="bg-amber-100/50 rounded-2xl p-4 border-2 border-amber-300 shadow-sm">
              <p
                className="text-3xl font-bold text-amber-800 mb-2 text-center"
                style={{ fontFamily: 'Sarabun, sans-serif' }}
              >
                {currentWord.thai}
              </p>
              {currentWord.pronunciation && (
                <p
                  className="text-base text-amber-700 italic text-center font-medium"
                  style={{ fontFamily: 'Patrick Hand, cursive' }}
                >
                  {currentWord.pronunciation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-4 flex-shrink-0">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-3">
            {thaiWords.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-amber-300 hover:bg-amber-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-amber-200 text-amber-400 cursor-not-allowed'
                  : 'bg-amber-400 text-white hover:bg-amber-500 hover:scale-110 active:scale-95 shadow-md'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === thaiWords.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === thaiWords.length - 1
                  ? 'bg-amber-200 text-amber-400 cursor-not-allowed'
                  : 'bg-amber-400 text-white hover:bg-amber-500 hover:scale-110 active:scale-95 shadow-md'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom decoration */}
          <div className="mt-3 text-center">
            <p className="text-[10px] text-amber-500 italic" style={{ fontFamily: 'Patrick Hand, cursive' }}>
              ✨ Practice makes perfect! ✨
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
