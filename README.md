# PH Newspaper 🗞️

PH Newspaper is a modern, web-based news platform that provides an interactive, map-driven experience for exploring news across Bangladesh. Users can navigate news through traditional categories or via an interactive geographical map.

## 🚀 Live Demo
[Insert Live Link Here]

## ✨ Features

### 📰 Core Newspaper Features
- **Dynamic Home Page:** Showcases breaking news, featured headlines, and the latest news feed.
- **Category-based Navigation:** Filter news by categories (National, International, Sports, etc.) from the navbar.
- **Advanced Filtering & Sorting:** Sort news articles by date or popularity.
- **News Detail Page:** Deep dive into articles with related news suggestions and auto-incrementing popularity views.
- **Pagination:** Smooth navigation with a 10-article per page limit on category pages.

### 🗺️ "Sara Desh" (Interactive Map)
- **Interactive Map Interface:** A fully functional map of Bangladesh with zoom and pan support.
- **District Markers:** Highlights districts that have active news stories.
- **Quick Preview:** Click on a marker to see news articles in a popup/modal without leaving the map.
- **District Search:** Search for specific districts with an autocomplete suggestion feature.
- **District Detail Page:** View district-specific statistics (charts) and a filtered list of news.

### 🛠️ Technical Highlights
- **SEO Optimized:** Meta tags and Open Graph (OG) images for better social media sharing.
- **Production Ready:** Optimized images using Next.js `next/image` and custom 404 error handling.
- **Database:** MongoDB for efficient data storage and retrieval.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB
- **Map Library:** (e.g., Leaflet.js / Mapbox / React-simple-maps)
- **Charts:** (e.g., Recharts / Chart.js)

## 📁 Project Structure (App Router)

```text
├── app/
│   ├── api/              # Backend API routes (Districts, News)
│   ├── news/             # Category and News Detail routes
│   ├── saradesh/         # Map and District Detail routes
│   └── components/       # Reusable UI components (Navbar, Footer, Hero)
├── public/               # Static assets & Favicon
└── types/                # TypeScript interfaces

```

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/ph-newspaper.git](https://github.com/your-username/ph-newspaper.git)
cd ph-newspaper

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env.local` file in the root directory and add your MongoDB URI:
```env
MONGODB_URI=your_mongodb_connection_string

```


4. **Run the development server:**
```bash
npm run dev

```


Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the result.

## 📸 Screenshots

| Home Page | Interactive Map |
| --- | --- |
|  |  |

---

Developed by Me

```

---
