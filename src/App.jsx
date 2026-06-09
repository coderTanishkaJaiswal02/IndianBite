import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromoBanners from './components/PromoBanners';
import CategorySlider from './components/CategorySlider';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import CartDrawer from './components/CartDrawer';
import Profile from './components/Profile';

export default function App() {
  const [address, setAddress] = useState('Chhoti Gwaltoli');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);


  // Footer Tab selection: 'deliver' | 'under-250' | 'profile'
  const [activeTab, setActiveTab] = useState('deliver');

  // Load/Save cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('indianbite_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('indianbite_cart', JSON.stringify(newCart));
  };

  // Cart Handlers
  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      saveCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find(c => c.id === itemId);
    if (!existing) return;
    if (existing.quantity === 1) {
      saveCart(cart.filter(c => c.id !== itemId));
    } else {
      saveCart(cart.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c));
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Reorder past order handler
  const handleReorder = (items) => {
    // Overwrite cart with the items from past order
    const reorderedCart = items.map(item => ({ ...item }));
    saveCart(reorderedCart);
    setShowCart(true);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-0 sm:p-4 md:p-6 transition-colors duration-300">

      {/* Smartphone Device Wrapper (Shows on Desktop, Fullscreen on Mobile) */}
      <div className="w-full h-screen sm:h-[860px] sm:max-w-md bg-white sm:rounded-[3rem] sm:border-[8px] sm:border-gray-800 shadow-2xl relative flex flex-col overflow-hidden transition-colors duration-300 dark:sm:border-gray-700">

        {/* Mock Speaker/Notch (Desktop only UI decoration) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-gray-800 rounded-b-2xl z-50">
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mt-1.5"></div>
        </div>

        {/* App Main Body */}
        <div className="flex-1 overflow-y-auto flex flex-col h-full sm:pt-4 no-scrollbar">

          {/* Deliver Tab & Under ₹250 Tab Layout */}
          {activeTab !== 'profile' ? (
            <>
              {/* Header */}
              <Header
                address={address}
                setAddress={setAddress}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                vegFilter={vegFilter}
                setVegFilter={setVegFilter}
                onOpenNotifications={() => setShowNotifications(true)}
                cartCount={cartCount}
                onOpenCart={() => setShowCart(true)}
              />

              {/* Mind Categories */}
              <CategorySlider
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {/* Banner Offers */}
              <PromoBanners />

              {/* Restaurant Grid (with dynamic pricing filter toggled by Under 250 rs) */}
              <RestaurantList
                searchQuery={searchQuery}
                vegFilter={vegFilter}
                selectedCategory={selectedCategory}
                onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
                under250Only={activeTab === 'under-250'}
              />
            </>
          ) : (
            /* Profile Tab Layout */
            <Profile onReorder={handleReorder} />
          )}

          {/* Spacer */}
          <div className="h-16 shrink-0"></div>
        </div>

        {/* Floating Cart Indicator Bar */}
        {cartCount > 0 && !showCart && (
          <div
            className="absolute bottom-18 left-4 right-4 bg-green-600 text-white rounded-xl shadow-lg p-3 flex items-center justify-between z-30 animate-bounce active:scale-98 transition-transform cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-100">{cartCount} items selected</span>
              <span className="text-sm font-extrabold">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <button className="flex items-center gap-1 text-xs font-black uppercase text-green-100">
              View Cart
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Footer sticky bottom navigation bar with 3 buttons: Delivery, Under 250 rs, Profile */}
        <div className="bg-white border-t border-gray-200 py-3.5 px-8 flex items-center justify-between shrink-0 z-30 shadow-md relative">

          {/* Button 1: Delivery */}
          <button
            onClick={() => setActiveTab('deliver')}
            className={`flex flex-col items-center gap-1 focus:outline-none transition-all duration-200 relative pt-0.5 ${activeTab === 'deliver' ? 'text-[#FF5200] font-bold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {activeTab === 'deliver' && (
              <div className="absolute -top-[15px] left-[-15px] right-[-15px] h-0.75 bg-red-500 rounded-b-md"></div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="w-5.5 h-5.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.321-5.128a2.25 2.25 0 0 0-2.247-2.112H12m-6 0h8.25m-8.25 0-1.5-3m1.5 3h1.5" />
            </svg>
            <span className="text-[10px] tracking-tight">Delivery</span>
          </button>

          {/* Button 2: Under 250 rs */}
          <button
            onClick={() => setActiveTab('under-250')}
            className={`flex flex-col items-center gap-1 focus:outline-none transition-all duration-200 relative pt-0.5 ${activeTab === 'under-250' ? 'text-[#FF5200] font-bold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {activeTab === 'under-250' && (
              <div className="absolute -top-[15px] left-[-15px] right-[-15px] h-0.75 bg-red-500 rounded-b-md"></div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="w-5.5 h-5.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 0 0 1.591 0l7.25-7.25a1.125 1.125 0 0 0 0-1.591l-9.581-9.581A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            <span className="text-[10px] tracking-tight">Under ₹250</span>
          </button>

          {/* Button 3: Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 focus:outline-none transition-all duration-200 relative pt-0.5 ${activeTab === 'profile' ? 'text-[#FF5200] font-bold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {activeTab === 'profile' && (
              <div className="absolute -top-[15px] left-[-15px] right-[-15px] h-0.75 bg-red-500 rounded-b-md"></div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="w-5.5 h-5.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-[10px] tracking-tight">Profile</span>
          </button>
        </div>

        {/* Modal: Restaurant Details (Slide open Menu) */}
        {selectedRestaurant && (
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            vegFilter={vegFilter}
          />
        )}

        {/* Drawer: Cart Panel */}
        {showCart && (
          <CartDrawer
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onClose={() => setShowCart(false)}
          />
        )}

        {/* Modal: Notifications */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-xs p-5 shadow-2xl space-y-3">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h4 className="font-bold text-gray-800">Notifications</h4>
                <button onClick={() => setShowNotifications(false)} className="text-xs text-gray-400 hover:text-gray-600">Close</button>
              </div>
              <div className="space-y-3">
                <div className="text-xs border-b border-gray-50 pb-2 ">
                  <p className="font-bold text-gray-700 ">📦 Order picked up!</p>
                  <p className="text-[10px] text-gray-500">Your order from Royal Biryani was picked up by delivery executive.</p>
                </div>
                <div className="text-xs border-b border-gray-50 pb-2 ">
                  <p className="font-bold text-gray-700 ">🎉 WELCOME50 Applied!</p>
                  <p className="text-[10px] text-gray-500">Flat 50% discount coupon applied on your first checkout.</p>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-gray-700 ">🍛 Weekend Delights</p>
                  <p className="text-[10px] text-gray-500">Explore authentic Punjabi Dhaba deals at 30% off!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mock Home Bar (Desktop only UI decoration) */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full z-50"></div>
      </div>
    </div>
  );
}
