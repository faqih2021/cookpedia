export const CATEGORIES = [
	{
		id: 'breakfast',
		label: 'Breakfast',
		icon: require('./assets/breakfast.png'),
		description: "what's on the breakfast menu today?",
	},
	{
		id: 'lunch',
		label: 'Lunch',
		icon: require('./assets/lunch.png'),
		description: "what's on the lunch menu today?",
	},
	{
		id: 'dinner',
		label: 'Dinner',
		icon: require('./assets/dinner.png'),
		description: "what's on the Dinner menu today?",
	},
	{
		id: 'dessert',
		label: 'Dessert',
		icon: require('./assets/dessert.png'),
		description: "What snacks did you eat today?",
	},
	{
		id: 'snack',
		label: 'Snack',
		icon: require('./assets/snack.png'),
		description: "What snacks did you eat today?",
	},
];

export const RECOMMENDATIONS = [
	{
		id: '1',
		title: 'Ayam Goreng Kriuk',
		by: 'Paki',
		image: require('./assets/ayam-goreng.jpeg'),
		category: 'breakfast',
		ingredients: ['1 ekor ayam, potong', '3 siung bawang putih', '1 sdt garam', '100 ml minyak untuk menggoreng'],
		steps: ['Cuci dan potong ayam', 'Haluskan bawang putih dan bumbu, lumuri ayam', 'Goreng ayam hingga matang dan kecokelatan'],
	},
	{
		id: '2',
		title: 'Nasi Goreng Spesial',
		by: 'Dwik',
		image: require('./assets/ayam-goreng.jpeg'),
		category: 'lunch',
		ingredients: ['2 piring nasi putih', '1 butir telur', '2 sdm kecap manis', '1 siung bawang putih'],
		steps: ['Panaskan minyak, tumis bawang putih', 'Masukkan telur, orak-arik', 'Tambahkan nasi dan kecap, aduk hingga rata'],
	},
	{
		id: '3',
		title: 'Tempe Allright',
		by: 'Tang',
		image: require('./assets/tempe.jpeg'),
		category: 'snack',
		ingredients: ['1 papan tempe, iris tipis', '50 gr tepung terigu', 'Garam dan merica secukupnya'],
		steps: ['Campur tepung dengan garam dan merica', 'Lumuri tempe dengan campuran tepung', 'Goreng hingga renyah dan kecokelatan'],
	},
	{
		id: '4',
		title: 'Belalang Goreng',
		by: 'Dwik',
		image: require('./assets/belalang.jpeg'),
		category: 'dinner',
		ingredients: ['200 gr belalang bersih', '2 sdm tepung beras', 'Garam, kunyit'],
		steps: ['Bersihkan belalang dan tiriskan', 'Lumuri dengan tepung dan bumbu', 'Goreng hingga garing'],
	},
];

export const RECIPES = RECOMMENDATIONS;

export const RECIPE_OF_THE_DAY = RECOMMENDATIONS[0] || null;

export default {
	CATEGORIES,
	RECOMMENDATIONS,
	RECIPES,
};
