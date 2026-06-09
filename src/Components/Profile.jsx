import React, { useState } from 'react';

export default function Profile({ onReorder }) {
  const [walletBalance, setWalletBalance] = useState(450);
  const [toastMessage, setToastMessage] = useState('');

  const addMoney = () => {
    setWalletBalance(prev => prev + 100);
    setToastMessage('₹100 added to IndianBite Pay!');
    setTimeout(() => setToastMessage(''), 2000);
  };

  const mockOrders = [
    {
      id: 'ord9823',
      restaurantName: 'Royal Biryani Kitchen',
      date: 'Yesterday, 8:30 PM',
      price: 439,
      status: 'Delivered',
      items: [
        { id: 'm101', name: 'Hyderabadi Chicken Biryani', price: 289, quantity: 1, isVeg: false, category: 'biryani' },
        { id: 'm105', name: 'Double Ka Meetha', price: 120, quantity: 1, isVeg: true, category: 'desserts' }
      ]
    },
    {
      id: 'ord8711',
      restaurantName: 'Saravana Bhavan',
      date: '05 June 2026, 9:15 AM',
      price: 215,
      status: 'Delivered',
      items: [
        { id: 'm301', name: 'Ghee Roast Masala Dosa', price: 130, quantity: 1, isVeg: true, category: 'south-indian' },
        { id: 'm304', name: 'Filter Coffee', price: 50, quantity: 1, isVeg: true, category: 'south-indian' }
      ]
    }
  ];

  return (
    <div className="flex-1 bg-white py-4 px-4 overflow-y-auto no-scrollbar animate-fade-in dark:bg-gray-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-bounce dark:bg-white dark:text-gray-950">
          {toastMessage}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex items-center gap-4 dark:bg-gray-900 dark:border-gray-800">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FF5200] shrink-0 bg-orange-100 flex items-center justify-center text-2xl">
          🧑‍💻
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-base text-gray-800 truncate dark:text-white">Tanishka Jaiswal</h3>
          <p className="text-xs text-gray-500 truncate dark:text-gray-400">tanishka@indianbite.com</p>
          <p className="text-xs font-semibold text-gray-400 mt-0.5 dark:text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      {/* Wallet Balance Widget */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-md mt-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">IndianBite Pay Wallet</span>
          <h4 className="text-2xl font-black mt-1">₹{walletBalance}</h4>
          <span className="text-[10px] opacity-80">Fast checkout active</span>
        </div>
        <button
          onClick={addMoney}
          className="bg-white text-orange-600 font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all focus:outline-none shrink-0"
        >
          + Add ₹100
        </button>
      </div>

      {/* Saved Addresses */}
      <div className="mt-5 space-y-3">
        <h4 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider dark:text-gray-400">Saved Addresses</h4>
        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-start gap-3 dark:bg-gray-900 dark:border-gray-800">
            <span className="text-lg mt-0.5">🏠</span>
            <div>
              <h5 className="font-bold text-xs text-gray-800 dark:text-white">Home</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 dark:text-gray-400">
                12th Main, Sector 4, HSR Layout, Bengaluru, Karnataka - 560102
              </p>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-start gap-3 dark:bg-gray-900 dark:border-gray-800">
            <span className="text-lg mt-0.5">💼</span>
            <div>
              <h5 className="font-bold text-xs text-gray-800 dark:text-white">Work</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 dark:text-gray-400">
                Tech Park Phase 2, Bellandur, Bengaluru, Karnataka - 560103
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Orders History */}
      <div className="mt-5 space-y-3">
        <h4 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider dark:text-gray-400">Past Orders</h4>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-xs dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex justify-between items-start border-b border-gray-100/60 pb-2.5 dark:border-gray-800">
                <div>
                  <h5 className="font-bold text-xs text-gray-850 dark:text-white">{order.restaurantName}</h5>
                  <span className="text-[10px] text-gray-400">{order.date}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950/20">
                  {order.status}
                </span>
              </div>
              
              <div className="py-2.5 space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100/60 pt-2.5 dark:border-gray-800">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Total Paid: ₹{order.price}</span>
                <button
                  onClick={() => onReorder(order.items)}
                  className="px-3 py-1.5 border border-[#FF5200] text-[#FF5200] hover:bg-orange-50 font-bold text-[10px] rounded-lg transition-all active:scale-95 dark:hover:bg-orange-950/25"
                >
                  Reorder Items
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-12"></div>
    </div>
  );
}
