require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Menu = require('./models/Menu');
const Offer = require('./models/Offer');

const ADMIN_PASSWORD = '6?G22,5Fpe5';

const menuItems = [
  // ==================== CLASSIC PIZZA ====================
  { name: 'Margherita Pizza', description: 'Gravy Cheese', category: 'Classic Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 200 }, { label: 'L', price: 330 }] },
  { name: 'Schezwan Veg Pizza', description: 'Tangy & Spicy Schezwan Sauce Toppe with Onion, Capsicum, Red Paper, Jalapenos', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Tandoori Paneer Pizza', description: 'Paneer, Capsicum, Red Paprica', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Spicy Pepper Pizza', description: 'Capsicum, Jalapeno, Red Paprica, Onion', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Paneer Wonder Pizza', description: 'Paneer, Capsicum, Onion, Corn', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Triple Spicy Treat Pizza', description: 'Onion, Jalapeno, Red Paprica, Paneer', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Mushroom Lovers Pizza', description: 'Jalapeno, Mushroom, Capsicum, Onion', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Special Pizza', description: 'Select Any Vegies', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 450 }] },
  { name: 'Malai Chaap Pizza', description: 'Onion, Chaap', category: 'Classic Pizza', sizes: [{ label: 'S', price: 150 }, { label: 'M', price: 300 }, { label: 'L', price: 400 }] },
  { name: 'Farm Fresh Pizza', description: 'Onion, Capsicum, Tomato, Mushroom, Blackolive, Corn, Jalapeno, Red Paprica', category: 'Classic Pizza', sizes: [{ label: 'S', price: 200 }, { label: 'M', price: 350 }, { label: 'L', price: 480 }] },
  { name: 'Kadhai Chaap Pizza', description: 'Jalapeno, Capsicum, Chaap', category: 'Classic Pizza', sizes: [{ label: 'S', price: 200 }, { label: 'M', price: 350 }, { label: 'L', price: 480 }] },
  { name: 'Tandoori Chaap Pizza', description: 'Onion, Jalapeno, Chaap, Red Paprica', category: 'Classic Pizza', sizes: [{ label: 'S', price: 200 }, { label: 'M', price: 350 }, { label: 'L', price: 480 }] },
  { name: 'Kadhai Paneer Pizza', description: 'Capsicum, Onion, Paneer', category: 'Classic Pizza', sizes: [{ label: 'S', price: 200 }, { label: 'M', price: 350 }, { label: 'L', price: 480 }] },

  // ==================== DOUBLE TOPPING PIZZA ====================
  { name: 'Onion + Paneer Pizza', description: 'Double topping pizza', category: 'Double Topping Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 250 }, { label: 'L', price: 400 }] },
  { name: 'Onion + Capsicum Pizza', description: 'Double topping pizza', category: 'Double Topping Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 250 }, { label: 'L', price: 400 }] },
  { name: 'Onion + Tomato Pizza', description: 'Double topping pizza', category: 'Double Topping Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 250 }, { label: 'L', price: 400 }] },
  { name: 'Sweet Corn + Tomato Pizza', description: 'Double topping pizza', category: 'Double Topping Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 250 }, { label: 'L', price: 400 }] },
  { name: 'Capsicum + Red Paprica Pizza', description: 'Double topping pizza', category: 'Double Topping Pizza', sizes: [{ label: 'S', price: 100 }, { label: 'M', price: 250 }, { label: 'L', price: 400 }] },

  // ==================== PIZZA EXTRAS ====================
  { name: 'Extra Vegies', description: 'Add extra vegetables to your pizza', category: 'Pizza Extras', sizes: [{ label: 'S', price: 30 }, { label: 'M', price: 40 }, { label: 'L', price: 60 }] },
  { name: 'Extra Cheese', description: 'Add extra cheese to your pizza', category: 'Pizza Extras', sizes: [{ label: 'S', price: 30 }, { label: 'M', price: 50 }, { label: 'L', price: 70 }] },
  { name: 'Thin Crust', description: 'Upgrade to thin crust', category: 'Pizza Extras', sizes: [{ label: 'S', price: 25 }, { label: 'M', price: 35 }, { label: 'L', price: 50 }] },
  { name: 'Cheese Burst', description: 'Upgrade to cheese burst crust', category: 'Pizza Extras', sizes: [{ label: 'S', price: 50 }, { label: 'M', price: 80 }] },

  // ==================== BURGERS ====================
  { name: 'De Amora Special Burger', description: 'Paneer Patty, Aloo Patty, Onion, Cheese Slice, Lettuce, Tomato', category: 'Burgers', sizes: [{ label: 'Regular', price: 150 }] },
  { name: 'Little Burger', description: 'Onion, Patty, Sauces', category: 'Burgers', sizes: [{ label: 'Regular', price: 49 }] },
  { name: 'Super Duper Burger', description: 'Sauces, Patty, Onion', category: 'Burgers', sizes: [{ label: 'Regular', price: 60 }] },
  { name: 'Kids Lover Burger', description: 'Creamy, Patty, Onion, Lettuce', category: 'Burgers', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Achari Burger', description: 'Achari Sauce, Patty, Onion', category: 'Burgers', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Spicy Burger', description: 'Paneer Patty, Onion, Tomato', category: 'Burgers', sizes: [{ label: 'Regular', price: 90 }] },
  { name: 'Cheesy Burger', description: 'Cheese Slice, Patty, Onion & Flavour', category: 'Burgers', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Tandoori Burger', description: 'Patty, Onion & Lettuce', category: 'Burgers', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Mexican Burger', description: 'Paneer, Patty, Onion, Spicy Sauce', category: 'Burgers', sizes: [{ label: 'Regular', price: 90 }] },
  { name: 'Farm Fresh Burger', description: 'Patty, Onion, Tomato, Lettuce, Olives, Red/Yellow Bell Pepper', category: 'Burgers', sizes: [{ label: 'Regular', price: 90 }] },

  // ==================== WRAPS ====================
  { name: 'Aloo Tikki Wrap', description: 'Classic aloo tikki wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Veggie Wrap', description: 'Fresh vegetable wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Masala Wrap', description: 'Spicy masala wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Iron Head Wrap', description: 'Signature iron head wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Paneer Wrap', description: 'Paneer filled wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Paneer Makhani Wrap', description: 'Paneer makhani flavored wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Paneer Salsa Wrap', description: 'Paneer with salsa wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 130 }] },
  { name: 'Spinach Wrap', description: 'Healthy spinach wrap', category: 'Wraps', sizes: [{ label: 'Regular', price: 140 }] },
  { name: 'Chaap Roll', description: 'Chaap filled roll', category: 'Wraps', sizes: [{ label: 'Regular', price: 120 }] },

  // ==================== PASTA ====================
  { name: 'Red Sauce Pasta', description: 'Classic red sauce pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },
  { name: 'White Sauce Pasta', description: 'Creamy white sauce pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },
  { name: 'Mix Sauce Pasta', description: 'Blend of red and white sauce', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },
  { name: 'Tandoori Pasta', description: 'Tandoori flavored pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },
  { name: 'Cheesy Pasta', description: 'Extra cheesy pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 180 }] },
  { name: 'Achari Pasta', description: 'Achari flavored pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },
  { name: 'Makhani Pasta', description: 'Rich makhani sauce pasta', category: 'Pasta', sizes: [{ label: 'Regular', price: 170 }] },

  // ==================== CHINESE ====================
  { name: 'Hakka Noodles', description: 'Classic hakka noodles', category: 'Chinese', sizes: [{ label: 'Regular', price: 130 }] },
  { name: 'Singapuri Noodles', description: 'Spicy singapuri style noodles', category: 'Chinese', sizes: [{ label: 'Regular', price: 140 }] },
  { name: 'Chilly Potato', description: 'Crispy chilly potato', category: 'Chinese', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Honey Chilly Potato', description: 'Sweet and spicy honey chilly potato', category: 'Chinese', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Manchurian (Dry, Gravy)', description: 'Classic manchurian', category: 'Chinese', sizes: [{ label: 'Regular', price: 150 }] },
  { name: 'Chilly Paneer', description: 'Spicy chilly paneer', category: 'Chinese', sizes: [{ label: 'Regular', price: 220 }] },
  { name: 'Chilly Mushroom', description: 'Spicy chilly mushroom', category: 'Chinese', sizes: [{ label: 'Regular', price: 150 }] },
  { name: 'Spring Roll', description: 'Crispy spring rolls', category: 'Chinese', sizes: [{ label: 'Regular', price: 140 }] },
  { name: 'Soya Chilly', description: 'Spicy soya chilly', category: 'Chinese', sizes: [{ label: 'Regular', price: 130 }] },

  // ==================== SALAD ====================
  { name: 'Pasta Salad', description: 'Pasta, Onion, Tomato, Capsicum, Corn, Baby Corn, Lettuce, Olives, Mushroom, Sauce & Spicy', category: 'Salad', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Greek Salad', description: 'Jalapeno, Paprica, Onion, Tomato, Capsicum, Iceburg, Olives, Mushroom, Paneer, Sauces', category: 'Salad', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Veg Caesar Salad', description: 'All Veggies, Paneer, Sauces', category: 'Salad', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Macaroni Salad', description: 'Macaroni, Onion, Tomato, Capsicum, Corn, Baby Corn, Lettuce, Olives, Mushroom, Sauce & Spicy', category: 'Salad', sizes: [{ label: 'Regular', price: 120 }] },

  // ==================== STARTER ====================
  { name: 'Fries', description: 'Classic french fries', category: 'Starter', sizes: [{ label: 'Regular', price: 99 }] },
  { name: 'Peri-Peri Fries', description: 'Fries with peri-peri seasoning', category: 'Starter', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Masala Fries', description: 'Spiced masala fries', category: 'Starter', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Cheesy Fries', description: 'Fries with cheese', category: 'Starter', sizes: [{ label: 'Regular', price: 130 }] },
  { name: 'Crispy Corn', description: 'Crispy fried corn', category: 'Starter', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Crispy Mushroom', description: 'Crispy fried mushroom', category: 'Starter', sizes: [{ label: 'Regular', price: 140 }] },
  { name: 'Pizza Pocket', description: 'Stuffed pizza pocket', category: 'Starter', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Peanut Masala', description: 'Spicy peanut masala', category: 'Starter', sizes: [{ label: 'Regular', price: 130 }] },
  { name: 'Choco Lava', description: 'Chocolate lava cake', category: 'Starter', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Veg Nuggets (14 Pcs)', description: 'Crispy veg nuggets', category: 'Starter', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Cheese Corn Nuggets (10 Pcs)', description: 'Cheese corn nuggets', category: 'Starter', sizes: [{ label: 'Regular', price: 150 }] },
  { name: 'Chilly Garlic Nuggets', description: 'Spicy chilly garlic nuggets', category: 'Starter', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Falafel Kabab', description: 'Falafel style kabab', category: 'Starter', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Mini Pizza', description: 'Small mini pizza', category: 'Starter', sizes: [{ label: 'Regular', price: 130 }] },

  // ==================== SHAKES ====================
  { name: 'Vanilla Shake', description: 'Classic vanilla shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 99 }] },
  { name: 'Butter Scotch Shake', description: 'Butter scotch flavored shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 99 }] },
  { name: 'Strawberry Shake', description: 'Fresh strawberry shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 99 }] },
  { name: 'Chocolate Shake', description: 'Rich chocolate shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 99 }] },
  { name: 'Black Current Shake', description: 'Black current flavored shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Cold Coffee', description: 'Classic cold coffee', category: 'Shakes', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Cold Coffee with Ice Cream', description: 'Cold coffee with a scoop of ice cream', category: 'Shakes', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Oreo Shake', description: 'Oreo cookie shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'KitKat Shake', description: 'KitKat flavored shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Brownie Shake', description: 'Brownie flavored shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Pineapple Shake', description: 'Fresh pineapple shake', category: 'Shakes', sizes: [{ label: 'Regular', price: 120 }] },

  // ==================== MOJITOS ====================
  { name: 'Virgin Mojito', description: 'Classic virgin mojito', category: 'Mojitos', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Peach Mojito', description: 'Peach flavored mojito', category: 'Mojitos', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Kala Khatta Mojito', description: 'Tangy kala khatta mojito', category: 'Mojitos', sizes: [{ label: 'Regular', price: 80 }] },
  { name: 'Blue Lagoon Mojito', description: 'Blue lagoon flavored mojito', category: 'Mojitos', sizes: [{ label: 'Regular', price: 90 }] },
  { name: 'Water Melon Mojito', description: 'Refreshing watermelon mojito', category: 'Mojitos', sizes: [{ label: 'Regular', price: 80 }] },

  // ==================== CHAAP ====================
  { name: 'Malai Chaap', description: 'Creamy malai chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Afghani Chaap', description: 'Rich afghani chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Lemon Chaap', description: 'Tangy lemon chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Haryali Chaap', description: 'Green haryali chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Masala Chaap', description: 'Spicy masala chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Achari Chaap', description: 'Pickle flavored achari chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Garlic Chaap', description: 'Garlic flavored chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },
  { name: 'Stuff Chaap', description: 'Stuffed chaap', category: 'Chaap', sizes: [{ label: 'Half', price: 150 }, { label: 'Full', price: 250 }] },

  // ==================== SANDWICH ====================
  { name: 'Veg Sandwich', description: 'Classic veg sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 50 }] },
  { name: 'Veggie & Corn Sandwich', description: 'Veggie and corn sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Paneer Sandwich', description: 'Paneer filled sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Peri-Peri Paneer Sandwich', description: 'Peri-peri paneer sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Tandoori Sandwich', description: 'Tandoori flavored sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 70 }] },
  { name: 'Gym Sandwich', description: 'Healthy gym sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 120 }] },
  { name: 'Double Sandwich', description: 'Double layered sandwich', category: 'Sandwich', sizes: [{ label: 'Regular', price: 130 }] },

  // ==================== BREADS ====================
  { name: 'Plain Garlic Bread', description: 'Classic garlic bread', category: 'Breads', sizes: [{ label: 'Regular', price: 90 }] },
  { name: 'Stuff Garlic Bread', description: 'Stuffed garlic bread', category: 'Breads', sizes: [{ label: 'Regular', price: 100 }] },
  { name: 'Mix Garlic Bread', description: 'Mix topping garlic bread', category: 'Breads', sizes: [{ label: 'Regular', price: 110 }] },
  { name: 'Spicy Garlic Bread', description: 'Spicy garlic bread', category: 'Breads', sizes: [{ label: 'Regular', price: 120 }] },

  // ==================== MOMOS ====================
  { name: 'Veg Momos', description: 'Steamed or fried veg momos', category: 'Momos', sizes: [{ label: 'Steam', price: 60 }, { label: 'Fried', price: 110 }] },
  { name: 'Paneer Momos', description: 'Steamed or fried paneer momos', category: 'Momos', sizes: [{ label: 'Steam', price: 90 }, { label: 'Fried', price: 150 }] },
  { name: 'Tandoori Veg Momos', description: 'Tandoori style veg momos', category: 'Momos', sizes: [{ label: 'Steam', price: 90 }, { label: 'Fried', price: 130 }] },
  { name: 'Tandoori Paneer Momos', description: 'Tandoori style paneer momos', category: 'Momos', sizes: [{ label: 'Steam', price: 100 }, { label: 'Fried', price: 160 }] },
  { name: 'Kurkure Veg Momos', description: 'Crispy kurkure veg momos', category: 'Momos', sizes: [{ label: 'Steam', price: 80 }, { label: 'Fried', price: 120 }] },
  { name: 'Kurkure Paneer Momos', description: 'Crispy kurkure paneer momos', category: 'Momos', sizes: [{ label: 'Steam', price: 100 }, { label: 'Fried', price: 160 }] },

  // ==================== TIKKA ====================
  { name: 'Paneer Tikka', description: 'Classic paneer tikka', category: 'Tikka', sizes: [{ label: 'Half', price: 160 }, { label: 'Full', price: 250 }] },
  { name: 'Malai Paneer Tikka', description: 'Creamy malai paneer tikka', category: 'Tikka', sizes: [{ label: 'Half', price: 170 }, { label: 'Full', price: 260 }] },
  { name: 'Achari Paneer Tikka', description: 'Achari flavored paneer tikka', category: 'Tikka', sizes: [{ label: 'Half', price: 170 }, { label: 'Full', price: 260 }] },
  { name: 'Mushroom Tikka', description: 'Grilled mushroom tikka', category: 'Tikka', sizes: [{ label: 'Half', price: 130 }, { label: 'Full', price: 200 }] },
];

const sampleOffers = [
  {
    title: 'Grand Opening Special',
    description: 'Get an incredible discount on your first order. Experience De Amora at its finest — freshly made, warmly served.',
    discountPercentage: 20,
  },
  {
    title: 'Pizza Party Thursday',
    description: 'Every Thursday, enjoy flat discount on all pizzas. Bring your friends and family for an unforgettable feast.',
    discountPercentage: 15,
  },
  {
    title: 'Shake & Chill Combo',
    description: 'Order any burger and get a premium shake at a special discounted price. The perfect pairing for the perfect day.',
    discountPercentage: 10,
  },
  {
    title: 'Weekend Brunch Feast',
    description: 'Make your weekends special with our exclusive brunch combo offer. Select from our curated menu of starters, chaap, and mojitos.',
    discountPercentage: 25,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Admin.deleteMany({});
    await Menu.deleteMany({});
    await Offer.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed admin with hashed password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);
    await Admin.create({ username: 'admin', passwordHash });
    console.log('👤 Admin user created (password hashed with bcrypt)');

    // Seed menu items
    await Menu.insertMany(menuItems);
    console.log(`🍽️  Inserted ${menuItems.length} menu items`);

    // Seed offers
    await Offer.insertMany(sampleOffers);
    console.log(`🎉 Inserted ${sampleOffers.length} offers`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
