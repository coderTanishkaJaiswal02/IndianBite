import React from 'react';
import { CATEGORIES } from '../data/mockData';

export default function CategorySlider({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="py-4 px-4 bg-white">

      {/* Title Row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-lg text-gray-900 leading-tight dark:text-white">
          What's on your mind<br />today?
        </h3>
        <button
          onClick={() => setSelectedCategory('all')}
          className="text-xs font-bold text-gray-500 hover:text-gray-700 flex items-center gap-1 focus:outline-none dark:text-gray-400"
        >
          <span>View All</span>
          <span className="text-sm">⇆</span>
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="flex flex-col items-center shrink-0 focus:outline-none"
            >
              {/* Circular Food Image Frame */}
              <div
                className={`w-18 h-18 rounded-full overflow-hidden flex items-center justify-center p-0.5 transition-all duration-300 transform active:scale-90 shadow-sm ${isSelected
                  ? 'border-2 border-[#FF5200] scale-105 shadow-md'
                  : 'border border-gray-200/60 hover:border-gray-300 bg-white dark:border-gray-800'
                  }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-2 font-black tracking-tight leading-none transition-colors duration-200 ${isSelected
                  ? 'text-[#FF5200]'
                  : 'text-gray-700 dark:text-gray-400'
                  }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
