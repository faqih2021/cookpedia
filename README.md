# 🍳 Cookpedia

<p align="center">
  <img src="./assets/logoCookpedia.png" alt="Cookpedia Logo" width="150"/>
</p>

<p align="center">
  <strong>Aplikasi mobile resep masakan yang membantu Anda menemukan inspirasi kuliner dari seluruh dunia</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-54.0.31-000020?logo=expo" alt="Expo"/>
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/NativeWind-4.1.23-06B6D4?logo=tailwindcss" alt="NativeWind"/>
</p>

---

## 📱 Tentang Aplikasi

**Cookpedia** adalah aplikasi mobile berbasis React Native & Expo yang menyediakan ribuan resep masakan dari berbagai negara. Aplikasi ini menggunakan [TheMealDB API](https://www.themealdb.com/) sebagai sumber data resep dan Supabase sebagai backend untuk autentikasi dan penyimpanan data pengguna.

## ✨ Fitur Utama

### 🏠 Home
- **Recipe of the Day** - Resep pilihan setiap hari
- **Categories** - Jelajahi resep berdasarkan kategori (Beef, Chicken, Dessert, dll.)
- **Recommendations** - Rekomendasi resep yang mungkin Anda suka

### 🔍 Search
- Pencarian resep berdasarkan nama
- Pencarian kategori makanan
- Filter berdasarkan huruf pertama untuk hasil yang lebih akurat

### 🎯 Filter
- **By Ingredient** - Filter resep berdasarkan bahan utama
- **By Country/Area** - Temukan masakan dari berbagai negara (Italian, Japanese, Mexican, dll.)
- **By Category** - Filter berdasarkan kategori makanan

### ❤️ Favorites
- Simpan resep favorit Anda
- Kelola daftar resep yang disimpan
- Sinkronisasi dengan akun pengguna

### 👤 Profile
- Kelola profil pengguna
- Upload foto profil
- Edit informasi akun

### 🔐 Authentication
- Register akun baru
- Login dengan email & password
- Remember me functionality
- Secure authentication via Supabase

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **React Native** | Framework utama untuk pengembangan mobile |
| **Expo** | Platform untuk mempermudah development React Native |
| **Expo Router** | File-based routing untuk navigasi |
| **Supabase** | Backend-as-a-Service untuk auth & storage |
| **NativeWind** | TailwindCSS untuk React Native |
| **Gluestack UI** | UI Component library |
| **Lucide Icons** | Icon library |
| **AsyncStorage** | Local storage untuk data persistence |

## 📁 Struktur Project

```
cookpedia/
├── app/                    # Screen pages (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── home.js        # Home screen
│   │   ├── search.js      # Search screen
│   │   ├── filter.js      # Filter screen
│   │   └── favorite.js    # Favorites screen
│   ├── auth/              # Authentication screens
│   │   ├── login.js       # Login page
│   │   └── register.js    # Register page
│   ├── filter/            # Filter result screens
│   │   └── result/        # Filter results
│   ├── profile.js         # User profile
│   ├── editProfile.js     # Edit profile
│   ├── recipeResults.js   # Recipe search results
│   └── categoryResults.js # Category results
├── components/            # Reusable components
│   ├── auth/             # Auth components
│   ├── filter/           # Filter components
│   ├── home/             # Home components
│   ├── search/           # Search components
│   └── ui/               # UI components (Skeleton, etc.)
├── context/              # React Context providers
│   └── FavoritesContext.js
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   ├── useFavorites.js
│   └── useFilterState.js
├── lib/                  # Library configurations
│   └── supabase.js       # Supabase client setup
└── assets/               # Images & static files
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (v18 atau lebih baru)
- npm atau yarn
- Expo CLI
- Expo Go app (untuk testing di device)

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/cookpedia.git
   cd cookpedia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   # Development mode
   npm start

   # Untuk Android
   npm run android

   # Untuk iOS
   npm run ios

   # Untuk Web
   npm run web
   ```

4. **Scan QR Code** dengan Expo Go app di device Anda

## 🔧 Konfigurasi Environment

Aplikasi ini menggunakan Supabase sebagai backend. Konfigurasi sudah tersedia di `lib/supabase.js`.

Untuk setup Supabase sendiri:
1. Buat project di [Supabase](https://supabase.com/)
2. Copy URL dan Anon Key dari project settings
3. Update konfigurasi di `lib/supabase.js`

## 📸 Screenshots

> *Coming soon*

## 🌐 API Reference

Aplikasi ini menggunakan [TheMealDB API](https://www.themealdb.com/api.php):

| Endpoint | Description |
|----------|-------------|
| `/search.php?s=` | Search meals by name |
| `/search.php?f=` | List meals by first letter |
| `/lookup.php?i=` | Lookup meal details by ID |
| `/categories.php` | List all categories |
| `/list.php?i=list` | List all ingredients |
| `/list.php?a=list` | List all areas |
| `/filter.php?i=` | Filter by ingredient |
| `/filter.php?a=` | Filter by area |
| `/filter.php?c=` | Filter by category |

## 👥 Tim Pengembang

- **Owner**: faqih2021, YogaMandalaWidigda, rafiisyeghani

## 📄 License

Project ini dibuat untuk keperluan tugas kuliah **Pengembangan Aplikasi Bergerak** - Semester 7.

---

<p align="center">
  Made with ❤️ using React Native & Expo
</p>
