export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60' },
  { id: 'south-indian', name: 'South Indian', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=150&auto=format&fit=crop&q=60' },
  { id: 'north-indian', name: 'Thali', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=150&auto=format&fit=crop&q=60' },
  { id: 'desserts', name: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=60' },
  { id: 'biryani', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&auto=format&fit=crop&q=60' },
  { id: 'burger', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=60' },
  { id: 'pizza', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=60' },
  { id: 'chinese', name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=150&auto=format&fit=crop&q=60' },
];

export const RESTAURANTS = [
  {
    id: '1',
    name: 'Royal Biryani Kitchen',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['Biryani', 'Mughlai', 'North Indian'],
    rating: 4.5,
    ratingCount: '5K+',
    deliveryTime: '22 mins',
    distance: '1.8 km',
    costForTwo: '₹350 for two',
    costForTwoNumeric: 350,
    isVeg: false,
    offers: '50% OFF up to ₹100',
    tag: 'Trending',
    menu: [
      { id: 'm101', name: 'Hyderabadi Chicken Biryani', price: 289, rating: 4.6, isVeg: false, category: 'biryani', description: 'Richly flavored aromatic rice layered with marinated chicken pieces cooked in a dum style.' },
      { id: 'm102', name: 'Paneer Makhani Biryani', price: 249, rating: 4.3, isVeg: true, category: 'biryani', description: 'Long-grained basmati rice layered with paneer tikka chunks cooked in a rich butter gravy.' },
      { id: 'm103', name: 'Chicken Tikka Kebab (6 Pcs)', price: 299, rating: 4.5, isVeg: false, category: 'north-indian', description: 'Spicy marinated boneless chicken chunks grilled to perfection in clay oven.' },
      { id: 'm104', name: 'Veg Dum Biryani', price: 219, rating: 4.4, isVeg: true, category: 'biryani', description: 'Fresh vegetables marinated in rich spices and cooked in a sealed pot with basmati rice.' },
      { id: 'm105', name: 'Double Ka Meetha', price: 120, rating: 4.7, isVeg: true, category: 'desserts', description: 'Traditional Hyderabadi bread pudding dessert soaked in saffron-infused milk and dry fruits.' }
    ]
  },
  {
    id: '2',
    name: 'Burger Singh',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['Burgers', 'Snacks', 'Beverages'],
    rating: 4.2,
    ratingCount: '10K+',
    deliveryTime: '18 mins',
    distance: '1.2 km',
    costForTwo: '₹250 for two',
    costForTwoNumeric: 250,
    isVeg: false,
    offers: '₹125 OFF above ₹249',
    tag: 'Super Fast',
    menu: [
      { id: 'm201', name: 'Amritsari Murgh Makhani Burger', price: 179, rating: 4.3, isVeg: false, category: 'burger', description: 'Crispy chicken patty topped with a spicy makhani sauce and fresh onions.' },
      { id: 'm202', name: 'Udta Punjab Double Veg Burger', price: 159, rating: 4.1, isVeg: true, category: 'burger', description: 'Mixed vegetable double patty burger loaded with cheese and lettuce.' },
      { id: 'm203', name: 'Masala Fries (Large)', price: 99, rating: 4.4, isVeg: true, category: 'burger', description: 'Crispy fries tossed in special Burger Singh spice mix.' },
      { id: 'm204', name: 'Cheese Burst Veg Patty', price: 199, rating: 4.5, isVeg: true, category: 'burger', description: 'Liquid cheese filled vegetable patty fried golden and topped with cream sauce.' }
    ]
  },
  {
    id: '3',
    name: 'Saravana Bhavan',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['South Indian', 'Pure Veg', 'Sweets'],
    rating: 4.6,
    ratingCount: '15K+',
    deliveryTime: '25 mins',
    distance: '2.5 km',
    costForTwo: '₹200 for two',
    costForTwoNumeric: 200,
    isVeg: true,
    offers: '20% OFF | Free Delivery',
    tag: 'Pure Veg',
    menu: [
      { id: 'm301', name: 'Ghee Roast Masala Dosa', price: 130, rating: 4.7, isVeg: true, category: 'south-indian', description: 'Crispy golden thin dosa roasted with ghee, stuffed with seasoned potato masala.' },
      { id: 'm302', name: 'Steam Rava Idli (2 Pcs)', price: 75, rating: 4.5, isVeg: true, category: 'south-indian', description: 'Fluffy steamed semolina cakes served with coconut chutney and sambar.' },
      { id: 'm303', name: 'Medu Vada (2 Pcs)', price: 85, rating: 4.4, isVeg: true, category: 'south-indian', description: 'Crispy deep-fried lentil donuts served hot with dipping sauces.' },
      { id: 'm304', name: 'Filter Coffee', price: 50, rating: 4.8, isVeg: true, category: 'south-indian', description: 'Authentic South Indian chicory-blend coffee frothed with boiling hot milk.' }
    ]
  },
  {
    id: '4',
    name: 'Punjabi Dhaba & Thali',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['North Indian', 'Thali', 'Punjabi'],
    rating: 4.3,
    ratingCount: '3K+',
    deliveryTime: '30 mins',
    distance: '3.4 km',
    costForTwo: '₹300 for two',
    costForTwoNumeric: 300,
    isVeg: true,
    offers: 'FREE Delivery above ₹199',
    tag: 'Comfort Food',
    menu: [
      { id: 'm401', name: 'Special Punjabi Veg Thali', price: 230, rating: 4.5, isVeg: true, category: 'north-indian', description: 'Complete meal with Dal Makhani, Paneer Butter Masala, Raita, Jeera Rice, 2 Roti, & Gulab Jamun.' },
      { id: 'm402', name: 'Dal Makhani Tadka', price: 180, rating: 4.4, isVeg: true, category: 'north-indian', description: 'Black lentils slow cooked overnight with butter, cream, and Indian spices.' },
      { id: 'm403', name: 'Butter Naan (1 Pc)', price: 45, rating: 4.6, isVeg: true, category: 'north-indian', description: 'Soft flatbread made of refined flour, baked in tandoor and brushed with butter.' },
      { id: 'm404', name: 'Paneer Tikka Masala', price: 220, rating: 4.3, isVeg: true, category: 'north-indian', description: 'Grilled cottage cheese cubes cooked in a thick spicy onion tomato gravy.' }
    ]
  },
  {
    id: '5',
    name: 'The Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['Pizza', 'Italian', 'Pasta'],
    rating: 4.1,
    ratingCount: '4K+',
    deliveryTime: '28 mins',
    distance: '2.1 km',
    costForTwo: '₹400 for two',
    costForTwoNumeric: 400,
    isVeg: false,
    offers: 'Buy 1 Get 1 Free (Selected)',
    tag: 'Party Favorite',
    menu: [
      { id: 'm501', name: 'Double Cheese Margherita Pizza', price: 299, rating: 4.4, isVeg: true, category: 'pizza', description: 'Classic pizza with loaded mozzarella cheese over tomato herb base.' },
      { id: 'm502', name: 'Spicy Chicken Tikka Pizza', price: 379, rating: 4.5, isVeg: false, category: 'pizza', description: 'Spicy chicken chunks, green chillies, onions, and red paprika.' },
      { id: 'm503', name: 'Garlic Bread Stuffed with Cheese', price: 149, rating: 4.2, isVeg: true, category: 'pizza', description: 'Freshly baked garlic bread filled with sweet corn, jalapenos and cheese.' }
    ]
  },
  {
    id: '6',
    name: 'Haldiram’s Sweets & Snacks',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['Desserts', 'Snacks', 'Chaat'],
    rating: 4.4,
    ratingCount: '8K+',
    deliveryTime: '15 mins',
    distance: '0.9 km',
    costForTwo: '₹150 for two',
    costForTwoNumeric: 150,
    isVeg: true,
    offers: '10% OFF on Sweets',
    tag: 'Quick Delivery',
    menu: [
      { id: 'm601', name: 'Kesar Rasgulla (2 Pcs)', price: 60, rating: 4.6, isVeg: true, category: 'desserts', description: 'Spongy cottage cheese balls soaked in delicious sugar syrup flavored with saffron.' },
      { id: 'm602', name: 'Hot Gulab Jamun (2 Pcs)', price: 70, rating: 4.8, isVeg: true, category: 'desserts', description: 'Deep fried milk solid balls soaked in cardamom flavored sugar syrup.' },
      { id: 'm603', name: 'Delhi Special Raj Kachori', price: 110, rating: 4.5, isVeg: true, category: 'desserts', description: 'Crispy fried kachori shell filled with potato, sprouts, sweet yogurt, chutneys and sev.' }
    ]
  },
  {
    id: '7',
    name: 'Wok & Roll Chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisines: ['Chinese', 'Noodles', 'Momos'],
    rating: 4.0,
    ratingCount: '2K+',
    deliveryTime: '24 mins',
    distance: '2.8 km',
    costForTwo: '₹300 for two',
    costForTwoNumeric: 300,
    isVeg: false,
    offers: '50% OFF up to ₹100',
    tag: 'Late Night',
    menu: [
      { id: 'm701', name: 'Schezwan Fried Rice (Veg)', price: 169, rating: 4.1, isVeg: true, category: 'chinese', description: 'Spicy wok tossed basmati rice flavored with home-made Schezwan sauce.' },
      { id: 'm702', name: 'Chicken Hakka Noodles', price: 189, rating: 4.3, isVeg: false, category: 'chinese', description: 'Wok fried soft noodles cooked with shredded chicken and oriental sauces.' },
      { id: 'm703', name: 'Steamed Veg Momos (6 Pcs)', price: 120, rating: 4.2, isVeg: true, category: 'chinese', description: 'Dumplings stuffed with finely minced vegetables, steamed and served with red chili chutney.' },
      { id: 'm704', name: 'Chili Chicken Gravy', price: 210, rating: 4.2, isVeg: false, category: 'chinese', description: 'Crispy batter chicken tossed in spicy garlic soy sauce with bell peppers.' }
    ]
  }
];

export const POPULAR_LOCATIONS = [
  'HSR Layout, Bengaluru',
  'Indiranagar, Bengaluru',
  'Koramangala, Bengaluru',
  'Whitefield, Bengaluru',
  'Connaught Place, New Delhi',
  'Juhu, Mumbai',
  'Salt Lake, Kolkata'
];
