// datas.js - Data dummy untuk recipes dan categories

export const categories = [
  {
    id: "1",
    name: "Breakfast",
    description: "Start your day with delicious breakfast recipes",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400",
    recipeCount: 15
  },
  {
    id: "2",
    name: "Lunch",
    description: "Hearty and satisfying lunch ideas",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    recipeCount: 22
  },
  {
    id: "3",
    name: "Dinner",
    description: "Perfect dinner recipes for any occasion",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    recipeCount: 28
  },
  {
    id: "4",
    name: "Dessert",
    description: "Sweet treats and delightful desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    recipeCount: 18
  },
  {
    id: "5",
    name: "Snacks",
    description: "Quick and tasty snack recipes",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400",
    recipeCount: 12
  },
  {
    id: "6",
    name: "Vegetarian",
    description: "Delicious meat-free recipes",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    recipeCount: 20
  },
  {
    id: "7",
    name: "Seafood",
    description: "Fresh and flavorful seafood dishes",
    image: "https://images.unsplash.com/photo-1559737558-2f5a32fea1f4?w=400",
    recipeCount: 16
  },
  {
    id: "8",
    name: "Salads",
    description: "Fresh and healthy salad recipes",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    recipeCount: 14
  }
];

export const recipes = [
  {
    id: "1",
    name: "Pancakes with Maple Syrup",
    category: "Breakfast",
    categoryId: "1",
    description: "Fluffy pancakes served with butter and maple syrup",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.8
  },
  {
    id: "2",
    name: "Avocado Toast",
    category: "Breakfast",
    categoryId: "1",
    description: "Creamy avocado on toasted bread with eggs",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
    prepTime: "5 mins",
    cookTime: "5 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.6
  },
  {
    id: "3",
    name: "Chicken Caesar Salad",
    category: "Lunch",
    categoryId: "2",
    description: "Classic Caesar salad with grilled chicken",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7
  },
  {
    id: "4",
    name: "Spaghetti Carbonara",
    category: "Dinner",
    categoryId: "3",
    description: "Creamy Italian pasta with bacon and parmesan",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    category: "Dessert",
    categoryId: "4",
    description: "Rich chocolate cake with molten center",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
    prepTime: "15 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Hard",
    rating: 4.9
  },
  {
    id: "6",
    name: "French Fries",
    category: "Snacks",
    categoryId: "5",
    description: "Crispy golden french fries",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5
  },
  {
    id: "7",
    name: "Veggie Buddha Bowl",
    category: "Vegetarian",
    categoryId: "6",
    description: "Colorful bowl with quinoa and roasted vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7
  },
  {
    id: "8",
    name: "Grilled Salmon",
    category: "Seafood",
    categoryId: "7",
    description: "Perfectly grilled salmon with lemon butter",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.8
  },
  {
    id: "9",
    name: "Greek Salad",
    category: "Salads",
    categoryId: "8",
    description: "Fresh Mediterranean salad with feta cheese",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6
  },
  {
    id: "10",
    name: "Beef Burger",
    category: "Lunch",
    categoryId: "2",
    description: "Juicy beef burger with all the toppings",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.8
  },
  {
    id: "11",
    name: "Margherita Pizza",
    category: "Dinner",
    categoryId: "3",
    description: "Classic Italian pizza with fresh basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
    prepTime: "30 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Hard",
    rating: 4.9
  },
  {
    id: "12",
    name: "Tiramisu",
    category: "Dessert",
    categoryId: "4",
    description: "Italian coffee-flavored dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    prepTime: "20 mins",
    cookTime: "0 mins",
    servings: 6,
    difficulty: "Medium",
    rating: 4.8
  },
  {
    id: "13",
    name: "Nachos Supreme",
    category: "Snacks",
    categoryId: "5",
    description: "Loaded nachos with cheese and toppings",
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400",
    prepTime: "10 mins",
    cookTime: "10 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7
  },
  {
    id: "14",
    name: "Mushroom Risotto",
    category: "Vegetarian",
    categoryId: "6",
    description: "Creamy Italian rice with mushrooms",
    image: "https://images.unsplash.com/photo-1476124369491-c4831d2d2fac?w=400",
    prepTime: "10 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Hard",
    rating: 4.8
  },
  {
    id: "15",
    name: "Shrimp Scampi",
    category: "Seafood",
    categoryId: "7",
    description: "Garlic butter shrimp with pasta",
    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b2?w=400",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    rating: 4.7
  }
];