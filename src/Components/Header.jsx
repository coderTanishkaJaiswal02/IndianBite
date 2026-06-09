import React, { useState } from 'react';
import { POPULAR_LOCATIONS } from '../data/mockData';

export default function Header({
  address,
  setAddress,
  searchQuery,
  setSearchQuery,
  vegFilter,
  setVegFilter,
  onOpenNotifications,
}) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [bellAnimated, setBellAnimated] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const triggerBell = () => {
    setBellAnimated(true);
    if (onOpenNotifications) onOpenNotifications();
    setTimeout(() => setBellAnimated(false), 500);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.start();
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setSearchQuery(text);
      };
    } else {
      setSearchQuery('burger');
    }
  };

  const isVeg = vegFilter === 'veg';

  return (
    <>
      {/* ===== BURGER BANNER HEADER ===== */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          height: '220px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.70) 100%)',
          }}
        />

        {/* Content above overlay */}
        <div className="relative z-10 flex flex-col h-full px-4 pt-4 pb-4">

          {/* ── Row 1: Location + Search + Veg Toggle + Bell ── */}
          <div className="flex items-center gap-2">

            {/* Location Button */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-start gap-1.5 text-left focus:outline-none shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-[#FF5200] shrink-0 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="flex items-center gap-0.5">
                  <span className="text-sm font-extrabold text-white tracking-tight leading-tight">
                    {address || 'Chhoti Gwaltoli'}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-white/80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest leading-none mt-0.5">
                  Madhya Pradesh, Indore
                </p>
              </div>
            </button>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-[#FF5200]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder='Search "biryani, burger..."'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full py-2 pl-9 pr-9 bg-white rounded-xl text-xs font-medium text-gray-800 focus:outline-none transition-all duration-200 placeholder-gray-400 shadow-lg"
                style={{
                  border: `2px solid ${searchFocused ? '#FF5200' : 'transparent'}`,
                }}
              />
              <button
                onClick={handleVoiceSearch}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#FF5200] hover:scale-110 active:scale-90 transition-transform duration-150"
                title="Voice Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3z"
                  />
                </svg>
              </button>
            </div>

            {/* Veg Toggle */}
            <div className="flex flex-col items-center gap-0.5 shrink-0 bg-white/20 backdrop-blur-sm rounded-xl px-2 py-1.5 border border-white/30">
              <span className="text-[8px] font-black tracking-wider uppercase text-white leading-none">VEG</span>
              <span className="text-[8px] font-black tracking-wider uppercase text-white leading-none mb-1">MODE</span>
              <button
                onClick={() => setVegFilter(isVeg ? 'all' : 'veg')}
                className="focus:outline-none"
                title={isVeg ? 'Veg Only — tap to show all' : 'Show Veg Only'}
              >
                <div className="relative flex items-center cursor-pointer" style={{ width: 38, height: 22 }}>
                  <div
                    className="w-full h-full rounded-full transition-colors duration-300"
                    style={{ backgroundColor: isVeg ? '#16a34a' : '#9ca3af' }}
                  />
                  <div
                    className="absolute top-1 transition-transform duration-300 shadow"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      left: 4,
                      transform: isVeg ? 'translateX(16px)' : 'translateX(0)',
                    }}
                  />
                </div>
              </button>
            </div>

            {/* Bell Icon */}
            <button
              onClick={triggerBell}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all focus:outline-none shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-5 h-5 ${bellAnimated ? 'animate-bell text-[#FF5200]' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>
          </div>

          {/* ── Promo Tagline (centre of banner) ── */}
          <div className="flex-1 flex flex-col items-center justify-center mt-1">
            <span className="text-[9px] font-bold tracking-[0.2em] text-yellow-300/90 uppercase mb-1">
              🌟 Indian Bites Missions 🌟
            </span>
            <h2 className="text-2xl font-black text-yellow-400 tracking-wider uppercase drop-shadow-lg">
              Veggie Delight
            </h2>
            <div className="mt-2 px-4 py-1.5 bg-green-700/90 rounded-full flex items-center gap-2 shadow-lg">
              <span className="text-[10px] text-white font-bold tracking-wider">🥬 PURE VEG MAGIC</span>
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-900">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== LOCATION SELECTOR MODAL ===== */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in">
          <div className="relative overflow-hidden rounded-t-[2.5rem] bg-white min-h-[380px] flex flex-col justify-between p-4 pb-7 shadow-[0_-10px_25px_rgba(0,0,0,0.15)] shrink-0 w-full max-w-md">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-bold text-lg text-gray-900">Choose delivery address</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 1 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 1 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto no-scrollbar">
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setAddress(loc);
                    setShowLocationModal(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition-all duration-150 ${
                    address === loc
                      ? 'bg-orange-50 text-[#FF5200] font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 shrink-0 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}