# Sunset Meadow Vineyards (Next.js)

This project has been migrated from Vite to **Next.js 15.1.6** using the App Router. It is a full restoration of the Sunset Meadow Vineyards website with dynamic data fetching, cart functionality, and responsive design.

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in the terminal) with your browser to see the result.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: React Context (Shop & Cart)
- **Styling**: Vanilla CSS (migrated from original implementation)
- **UI Icons**: Lucide React
- **Maps**: React Leaflet
- **Animations**: Framer Motion
- **API**: GraphQL (WPGraphQL) & WooCommerce REST API

## 📂 Project Structure

- `src/app/`: Contains the application routes and pages.
- `src/components/`: Reusable React components.
- `src/context/`: Context providers for Shop and Cart state.
- `src/data/`: Static fallback data for wines and events.
- `public/`: Static assets (images, icons, etc.).

## ⚙️ Configuration

The project uses `next.config.js` for API rewrites to bypass CORS and proxy requests to the WordPress backend:
- `/graphql` -> `http://sunsetmeadow-admin.local/graphql`
- `/wp-json` -> `http://sunsetmeadow-admin.local/wp-json`

## 📦 Deployment

This project is optimized for deployment on **Vercel**. Run the build command locally to verify:

```bash
npm run build
```

---
*Sunset Meadow Vineyards - Award-Winning Estate Winery*
