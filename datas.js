export const CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast', icon: require('./assets/breakfast.png'), description: 'Morning delights to jumpstart your day.' },
  { id: 'lunch', label: 'Lunch', icon: require('./assets/lunch.png'), description: 'Hearty midday meals to keep you going.' },
  { id: 'dinner', label: 'Dinner', icon: require('./assets/dinner.png'), description: 'Comforting dinners for the whole family.' },
  { id: 'dessert', label: 'Dessert', icon: require('./assets/dessert.png'), description: 'Sweet treats to finish any meal.' },
  { id: 'snack', label: 'Snack', icon: require('./assets/snack.png'), description: 'Quick bites and tasty snacks.' }
];

export const RECOMMENDATIONS = [
  { id: '1', title: 'Ayam Goreng', by: 'By Paki', image: require('./assets/ayam-goreng.jpeg'), category: 'dinner' },
  { id: '2', title: 'Belalang Goreng', by: 'By Dwik', image: require('./assets/belalang.jpeg'), category: 'snack' },
  { id: '3', title: 'Tempe Allright', by: 'By Tang', image: require('./assets/tempe.jpeg'), category: 'lunch' },
  { id: '4', title: 'Sop Buah', by: 'By Syeghandy', image: require('./assets/sopbuah.jpg'), category: 'dessert' },
  { id: '5', title: 'Tahu Tek', by: 'By Mangdalla', image: require('./assets/tahutek.jpg'), category: 'snack' }
];

export const RECIPE_OF_THE_DAY = RECOMMENDATIONS[0];
