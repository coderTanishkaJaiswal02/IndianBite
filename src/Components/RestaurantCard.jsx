import React from 'react';

export default function RestaurantCard({ restaurant, onClick }) {
  const isHighRated = restaurant.rating >= 4.4;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 transform active:scale-98 cursor-pointer flex flex-col h-full group dark:bg-gray-950 dark:border-gray-900"
    >
      {/* Image with offer tag overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Offer Tag */}
        {restaurant.offers && (
          <div className="absolute bottom-2.5 left-3 text-white font-extrabold text-[13px] tracking-tight flex items-center gap-1">
            <span className="bg-[#FF5200] text-[10px] px-1.5 py-0.5 rounded font-black uppercase">
              OFFER
            </span>
            <span>{restaurant.offers}</span>
          </div>
        )}

        {/* Top Tag (e.g. Trending, Pure Veg) */}
        {restaurant.tag && (
          <span className={`absolute top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-xs ${
            restaurant.tag === 'Pure Veg' 
              ? 'bg-green-600' 
              : restaurant.tag === 'Super Fast' 
                ? 'bg-blue-600' 
                : 'bg-orange-600'
          }`}>
            {restaurant.tag}
          </span>
        )}
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Restaurant Name */}
        <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#FF5200] transition-colors duration-200 line-clamp-1 dark:text-white">
          {restaurant.name}
        </h4>

        {/* Rating and Delivery Info */}
        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1 text-gray-600 dark:text-gray-400">
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-white ${
            isHighRated ? 'bg-green-600' : 'bg-amber-500'
          }`}>
            <span className="text-[10px]">★</span>
            <span>{restaurant.rating}</span>
          </div>
          <span>•</span>
          <span>{restaurant.deliveryTime}</span>
          <span>•</span>
          <span>{restaurant.distance}</span>
        </div>

        {/* Cuisines */}
        <p className="text-[11px] text-gray-500 mt-2 line-clamp-1 dark:text-gray-400">
          {restaurant.cuisines.join(', ')}
        </p>

        {/* Cost For Two */}
        <div className="mt-auto pt-2.5 border-t border-gray-100 flex items-center justify-between dark:border-gray-900">
          <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
            {restaurant.costForTwo}
          </span>
          <span className="text-[10px] text-[#FF5200] font-bold group-hover:underline flex items-center gap-0.5">
            Order Now 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
