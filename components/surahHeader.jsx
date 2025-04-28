import React from 'react';

const SurahHeader = () => {
  return (
    <div className="relative min-h-[180px] sm:min-h-[220px] md:min-h-[350px] flex items-center justify-start pl-4 sm:pl-6 md:pl-10 pr-0 py-6 sm:py-8 md:py-16 bg-cover bg-center overflow-hidden font-sans" style={{ backgroundImage: "url('/surah-bg.jpg')" }}>
      <div className="absolute inset-0 bg-[#14462c] opacity-75 z-0" />
      <div className="relative z-10 w-full max-w-2xl px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6 text-white drop-shadow-lg tracking-tight">
          Explore the Beauty of Quran Recitations
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-normal text-green-100 leading-relaxed drop-shadow-md">
          Listen to daily Quran recitations, each recorded with clear tajweed and heartfelt delivery. Select from growing library of Surahs below.
        </p>
      </div>
    </div>
  );
};

export default SurahHeader;
