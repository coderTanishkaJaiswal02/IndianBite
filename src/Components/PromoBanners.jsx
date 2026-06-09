import React from 'react';

const OFFERS = [
  { id: 'off1', title: '60% OFF', subtitle: 'Up to ₹120 • On Biryani', code: 'BIRYANI60', color: 'from-orange-500 to-amber-500', icon: '🍛' },
  { id: 'off2', title: 'FREE DELIVERY', subtitle: 'On your first 3 orders', code: 'FREEBITE', color: 'from-emerald-500 to-teal-500', icon: '🛵' },
  { id: 'off3', title: '₹100 FLAT OFF', subtitle: 'Above ₹299 spend', code: 'WELCOME100', color: 'from-rose-500 to-pink-500', icon: '🎉' },
  { id: 'off4', title: 'BUY 1 GET 1', subtitle: 'At top pizza houses', code: 'PIZZABOGO', color: 'from-blue-500 to-indigo-500', icon: '🍕' }
];

export default function PromoBanners() {
  return (
    <div className="py-4 px-4 bg-white dark:bg-gray-950/20">
      <h3 className="font-bold text-base text-gray-800 mb-3 flex items-center gap-1.5 dark:text-white">
        <span>🔥</span> Special Offers for You
      </h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1 snap-x">
        {OFFERS.map((offer) => (
          <div
            key={offer.id}
            className={`flex-none w-64 rounded-2xl bg-gradient-to-br ${offer.color} p-4 text-white shadow-md snap-start transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Code: {offer.code}
                </span>
                <h4 className="text-xl font-extrabold mt-1.5 tracking-tight">{offer.title}</h4>
                <p className="text-xs text-white/90 font-medium mt-0.5">{offer.subtitle}</p>
              </div>
              <span className="text-3xl filter drop-shadow-sm select-none">{offer.icon}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] text-white/80">Tap to apply coupon</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white/90">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
