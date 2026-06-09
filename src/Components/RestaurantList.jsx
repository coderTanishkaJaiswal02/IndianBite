import React, { useState, useMemo } from 'react';
import RestaurantCard from './RestaurantCard';
import { RESTAURANTS } from '../data/mockData';

export default function RestaurantList({ searchQuery, vegFilter, selectedCategory, onSelectRestaurant, under250Only }) {
  const [sortBy, setSortBy] = useState('relevance'); // relevance, rating, delivery, price-low, price-high

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((restaurant) => {
      // 1. Search Query Filter (name, cuisines, or item name matches)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisines.some(c => c.toLowerCase().includes(query)) ||
        restaurant.menu.some(item => item.name.toLowerCase().includes(query));

      // 2. Category Filter
      const matchesCategory = selectedCategory === 'all' ||
        restaurant.cuisines.some(c => c.toLowerCase() === selectedCategory.toLowerCase()) ||
        restaurant.menu.some(item => item.category === selectedCategory);

      // 3. Veg / Non-Veg Filter
      let matchesVeg = true;
      if (vegFilter === 'veg') {
        matchesVeg = restaurant.isVeg || restaurant.menu.some(item => item.isVeg);
      } else if (vegFilter === 'non-veg') {
        matchesVeg = !restaurant.isVeg || restaurant.menu.some(item => !item.isVeg);
      }

      // 4. Price Filter (Under 250 rs)
      const matchesPrice = !under250Only || restaurant.costForTwoNumeric <= 250;

      return matchesSearch && matchesCategory && matchesVeg && matchesPrice;
    }).sort((a, b) => {
      // 4. Sort Logic
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'delivery') {
        const timeA = parseInt(a.deliveryTime);
        const timeB = parseInt(b.deliveryTime);
        return timeA - timeB;
      }
      if (sortBy === 'price-low') {
        return a.costForTwoNumeric - b.costForTwoNumeric;
      }
      if (sortBy === 'price-high') {
        return b.costForTwoNumeric - a.costForTwoNumeric;
      }
      return 0; // relevance / default
    });
  }, [searchQuery, vegFilter, selectedCategory, sortBy]);

  return (
    <div className="py-4 px-4 bg-white flex-1 dark:bg-gray-950/20">
      {/* List Header & Sort Option Pills */}
      <div className="flex flex-col gap-2.5 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-gray-800 dark:text-white">
            {filteredRestaurants.length} Restaurants Nearby
          </h3>
        </div>

        {/* Sort Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSortBy('relevance')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all duration-150 ${
              sortBy === 'relevance'
                ? 'bg-[#FF5200] border-orange-600 text-white shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400'
            }`}
          >
            Relevance
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all duration-150 ${
              sortBy === 'rating'
                ? 'bg-[#FF5200] border-orange-600 text-white shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400'
            }`}
          >
            Ratings 4.0+
          </button>
          <button
            onClick={() => setSortBy('delivery')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all duration-150 ${
              sortBy === 'delivery'
                ? 'bg-[#FF5200] border-orange-600 text-white shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400'
            }`}
          >
            Fast Delivery
          </button>
          <button
            onClick={() => setSortBy('price-low')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all duration-150 ${
              sortBy === 'price-low'
                ? 'bg-[#FF5200] border-orange-600 text-white shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400'
            }`}
          >
            Cost: Low to High
          </button>
          <button
            onClick={() => setSortBy('price-high')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all duration-150 ${
              sortBy === 'price-high'
                ? 'bg-[#FF5200] border-orange-600 text-white shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400'
            }`}
          >
            Cost: High to Low
          </button>
        </div>
      </div>

      {/* Grid List */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="animate-fade-in">
              <RestaurantCard
                restaurant={restaurant}
                onClick={() => onSelectRestaurant(restaurant)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-4xl mb-2">🔍</span>
          <h4 className="font-bold text-gray-700 dark:text-gray-300">No restaurants found</h4>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px] dark:text-gray-400">
            Try resetting your search query or choosing another category/filter.
          </p>
        </div>
      )}
    </div>
  );
}
