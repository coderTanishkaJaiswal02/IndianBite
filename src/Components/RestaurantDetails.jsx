import React, { useState } from 'react';

export default function RestaurantDetails({ restaurant, onClose, cart, addToCart, removeFromCart, vegFilter }) {
  const [localVegFilter, setLocalVegFilter] = useState(vegFilter === 'veg');

  // Filter items in restaurant menu based on Veg/Non-veg selection
  const filteredMenu = restaurant.menu.filter(item => {
    if (localVegFilter) return item.isVeg;
    if (vegFilter === 'non-veg') return !item.isVeg;
    return true;
  });

  const getQuantityInCart = (itemId) => {
    const cartItem = cart.find(c => c.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-end xs:items-center p-0 xs:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md h-[92vh] xs:h-[85vh] xs:rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-slide-up dark:bg-gray-950">
        
        {/* Cover / Hero Header */}
        <div className="relative h-44 shrink-0 bg-gray-100 dark:bg-gray-900">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/95 text-gray-800 p-2 rounded-full hover:bg-white active:scale-95 shadow-md transition-all dark:bg-gray-900 dark:text-white"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Restaurant Quick details */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-extrabold tracking-tight drop-shadow-sm">{restaurant.name}</h2>
            <p className="text-xs text-white/90 drop-shadow-sm truncate">{restaurant.cuisines.join(', ')}</p>
          </div>
        </div>

        {/* Info Card Block */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-600 dark:border-gray-900 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-emerald-500 font-bold">★</span>
            <span className="text-gray-800 dark:text-gray-200">{restaurant.rating} ({restaurant.ratingCount})</span>
          </div>
          <span>•</span>
          <span>{restaurant.deliveryTime}</span>
          <span>•</span>
          <span>{restaurant.costForTwo}</span>
        </div>

        {/* Search menu & Veg Toggle */}
        <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-t border-gray-100 shrink-0 dark:bg-gray-900/40 dark:border-gray-900">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Menu Dishes</span>
          
          {/* Local Veg Only Filter Switch */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">Veg Only</span>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={localVegFilter}
                onChange={() => setLocalVegFilter(!localVegFilter)}
                className="sr-only peer"
              />
              <div className="w-8 h-4.5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
            </div>
          </label>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => {
              const qty = getQuantityInCart(item.id);
              return (
                <div 
                  key={item.id} 
                  className="flex gap-3 pb-4 border-b border-gray-100/80 last:border-0 last:pb-0 dark:border-gray-900"
                >
                  {/* Left: Veg icon, Title, Price, Rating, Description */}
                  <div className="flex-1 flex flex-col">
                    {/* Veg/Non-veg Indicator Box */}
                    <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 mb-1 rounded-[3px] ${
                      item.isVeg ? 'border-green-600' : 'border-red-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 text-sm dark:text-white">{item.name}</h4>
                    <span className="text-xs font-bold text-gray-600 mt-0.5 dark:text-gray-400">₹{item.price}</span>
                    
                    {item.rating && (
                      <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 mt-1">
                        <span>★</span>
                        <span>{item.rating}</span>
                      </div>
                    )}
                    
                    {item.description && (
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right: Quantity Handler or Add Button */}
                  <div className="w-24 shrink-0 flex flex-col items-center justify-center gap-2">
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-1.5 px-3 bg-white border border-gray-200 text-green-600 font-extrabold text-xs rounded-lg shadow-sm hover:border-green-400 active:scale-95 transition-all focus:outline-none dark:bg-gray-900 dark:border-gray-800"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between bg-green-500 text-white rounded-lg shadow-sm font-extrabold text-xs overflow-hidden">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-2.5 py-1.5 hover:bg-green-600 active:scale-95 select-none"
                        >
                          -
                        </button>
                        <span className="px-1 text-center min-w-[16px]">{qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2.5 py-1.5 hover:bg-green-600 active:scale-95 select-none"
                        >
                          +
                        </button>
                      </div>
                    )}
                    <span className="text-[9px] text-gray-400">Customizable</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500 text-xs">
              No menu items match your current Veg/Non-Veg filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
