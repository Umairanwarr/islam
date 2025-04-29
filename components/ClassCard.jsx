import React from 'react';

const ClassCard = ({ classItem }) => {
  const dateObj = classItem.time ? new Date(classItem.time) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const timeStr = dateObj ? dateObj.toLocaleTimeString(undefined, { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' }).replace(/,/, '') : '';
  const isJoinDisabled = !classItem.link || classItem.link.trim() === '';

  return (
    <div
      className="rounded-2xl shadow-lg border border-green-100 overflow-hidden p-6 relative max-w-lg mx-auto"
      style={{
        backgroundImage: "url('/class-bg.jpg')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div className="absolute inset-0" style={{background: 'rgb(230 232 231 / 15%)', zIndex: 1}} />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{background:'#08948c'}}>Featured</span>
          <span className="text-gray-600 text-sm font-medium">{dateStr}</span>
        </div>
        <div className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-1">{classItem.title}</div>
        <div className="text-gray-700 text-base mb-2">{classItem.about}</div>
        <div className="flex items-center gap-2 text-gray-700 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#08948c"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>{timeStr}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#08948c"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9zm0 0v18m9-9H3" /></svg>
          <span>Live via Zoom & YouTube</span>
        </div>
        <div className="flex gap-3 mt-2 justify-center">
          <a
            href={isJoinDisabled ? undefined : classItem.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-lg shadow ${isJoinDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            style={{background:'#08948c'}}
            tabIndex={isJoinDisabled ? -1 : 0}
            aria-disabled={isJoinDisabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Join Class
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClassCard; 