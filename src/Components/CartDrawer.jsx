import React, { useState } from 'react';

export default function CartDrawer({ cart, addToCart, removeFromCart, clearCart, onClose }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: string, discount: number }
  const [couponError, setCouponError] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Math Calculations
  const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let deliveryFee = itemTotal > 0 ? 30 : 0;
  if (appliedCoupon?.code === 'FREEBITE') {
    deliveryFee = 0;
  }
  
  const platformFee = itemTotal > 0 ? 5 : 0;
  const tax = Math.round(itemTotal * 0.05); // 5% GST
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'WELCOME100') {
      discount = Math.min(100, itemTotal);
    } else if (appliedCoupon.code === 'BIRYANI60') {
      // Check if they have biryani in cart
      const hasBiryani = cart.some(item => item.category === 'biryani');
      if (hasBiryani) {
        discount = Math.round(itemTotal * 0.6);
      } else {
        discount = 0;
      }
    } else if (appliedCoupon.code === 'PIZZABOGO') {
      // BOGO: Discount one cheapest pizza item price
      const pizzas = cart.filter(item => item.category === 'pizza');
      if (pizzas.length > 0) {
        const cheapestPizza = [...pizzas].sort((a, b) => a.price - b.price)[0];
        discount = cheapestPizza.price;
      }
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + platformFee + tax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.toUpperCase().trim();

    if (!code) return;

    if (code === 'WELCOME100') {
      setAppliedCoupon({ code, discountText: '₹100 flat discount applied!' });
    } else if (code === 'BIRYANI60') {
      const hasBiryani = cart.some(item => item.category === 'biryani');
      if (hasBiryani) {
        setAppliedCoupon({ code, discountText: '60% Biryani discount applied!' });
      } else {
        setCouponError('Add a Biryani item to use this code.');
      }
    } else if (code === 'FREEBITE') {
      setAppliedCoupon({ code, discountText: 'Free Delivery applied!' });
    } else if (code === 'PIZZABOGO') {
      const hasPizza = cart.some(item => item.category === 'pizza');
      if (hasPizza) {
        setAppliedCoupon({ code, discountText: 'Pizza BOGO discount applied!' });
      } else {
        setCouponError('Add a Pizza item to use this code.');
      }
    } else {
      setCouponError('Invalid coupon code. Try WELCOME100 or FREEBITE.');
    }
  };

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderCompleted(true);
      setTimeout(() => {
        clearCart();
        setOrderCompleted(false);
        onClose();
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-end xs:items-center p-0 xs:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md h-[92vh] xs:h-[85vh] xs:rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-slide-up dark:bg-gray-950">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 dark:border-gray-900">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h3 className="font-extrabold text-lg text-gray-800 dark:text-white">Your Cart</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 1 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 1 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          {orderCompleted ? (
            /* Order Success State */
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-green-300 dark:bg-green-950/20 dark:border-green-800">
                🎉
              </div>
              <h3 className="text-2xl font-black text-[#FF5200]">Order Placed!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your food is being prepared at the kitchen. Our delivery executive will pick it up shortly!
              </p>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                <div className="h-full bg-green-500 rounded-full animate-[loading_2.5s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
              </div>
              <span className="text-[10px] text-gray-400">Transaction ID: TXN-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          ) : isOrdering ? (
            /* Placing Order State */
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 border-4 border-t-orange-500 border-orange-200 rounded-full animate-spin"></div>
              <h4 className="font-bold text-gray-700 dark:text-gray-300">Contacting restaurant...</h4>
              <p className="text-xs text-gray-400">Securing your delivery driver</p>
            </div>
          ) : cart.length > 0 ? (
            /* Active Cart Items List */
            <>
              <div className="space-y-3.5">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0 dark:border-gray-900/60">
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 border ${
                          item.isVeg ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'
                        }`}></span>
                        <h4 className="font-bold text-xs text-gray-800 line-clamp-1 dark:text-white">{item.name}</h4>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5 inline-block dark:text-gray-400">₹{item.price}</span>
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center border border-gray-200/80 rounded-lg shadow-xs overflow-hidden h-7 shrink-0 dark:border-gray-800">
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="px-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-extrabold text-sm active:scale-95 transition-all h-full dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        -
                      </button>
                      <span className="px-2 text-center text-xs font-bold text-gray-800 min-w-[20px] dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)} 
                        className="px-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-extrabold text-sm active:scale-95 transition-all h-full dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code section */}
              <form onSubmit={handleApplyCoupon} className="border-t border-b border-gray-100 py-3.5 dark:border-gray-900">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. WELCOME100)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#FF5200] uppercase dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-gray-800 hover:bg-[#FF5200] text-white text-xs font-bold rounded-lg transition-colors focus:outline-none"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 text-xs text-green-600 font-bold flex items-center justify-between">
                    <span>✓ {appliedCoupon.discountText}</span>
                    <button 
                      type="button" 
                      onClick={() => setAppliedCoupon(null)}
                      className="text-gray-400 hover:text-red-500 font-normal underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="mt-2 text-xs text-red-500 font-semibold">✗ {couponError}</p>
                )}
              </form>

              {/* Bill Summary */}
              <div className="space-y-2 text-xs">
                <h4 className="font-extrabold text-gray-800 dark:text-white">Bill Details</h4>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>GST & Restaurant Taxes (5%)</span>
                  <span>₹{tax}</span>
                </div>
                {appliedCoupon && discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold border-t border-gray-100 pt-2.5 text-gray-800 dark:border-gray-900 dark:text-white">
                  <span>To Pay</span>
                  <span className="text-base text-[#FF5200]">₹{grandTotal}</span>
                </div>
              </div>
            </>
          ) : (
            /* Empty Cart State */
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2">
              <span className="text-5xl">🛍️</span>
              <h4 className="font-bold text-gray-700 dark:text-gray-300">Your cart is empty</h4>
              <p className="text-xs text-gray-400 max-w-[200px]">
                Add some tasty dishes from your favorite local restaurants to get cooking!
              </p>
            </div>
          )}
        </div>

        {/* Footer Place Order Button */}
        {!orderCompleted && !isOrdering && cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 shrink-0 bg-gray-50 dark:bg-gray-900/40 dark:border-gray-900">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-[#FF5200] hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <span>Place Order • ₹{grandTotal}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
