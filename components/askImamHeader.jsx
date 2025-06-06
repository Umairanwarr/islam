import React from 'react';

const AskImamHeader = () => {
  return (
    <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center justify-center py-10 sm:py-12 md:py-16 bg-cover bg-center overflow-hidden font-sans" style={{ backgroundImage: "url('/askImam.jpg')" }}>
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-[#08948c] opacity-70 z-0" />
      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 sm:mb-8 md:mb-10 text-white drop-shadow-lg tracking-tight">
          Ask the Imam
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-white leading-relaxed drop-shadow-md mx-auto max-w-2xl px-4">
          Have a question about Islam, life, or the Qur'an? Submit your question here and receive a personalized response from me directly, insha'Allah.
        </p>
      </div>
    </div>
  );
};

export default AskImamHeader;
