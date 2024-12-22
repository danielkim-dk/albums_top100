# iTunes Top 100 Albums Viewer

A modern web application built with Next.js that displays iTunes' Top 100 albums with a beautiful, responsive interface. Users can view album details, search through albums, and maintain a list of their favorites.

## Features

- 📱 Responsive grid layout that adapts to different screen sizes
- 🔍 Real-time search functionality to filter albums
- ❤️ Favorite system to save and track your preferred albums
- 🎵 Album details including title, artist, and cover art
- 🔄 Automatic data fetching from iTunes API
- 🌓 Modern UI with smooth animations and transitions

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom components with shadcn/ui
- **Type Safety**: TypeScript

## Project Structure

```
app/
├── (homepage)/          # Route group for main pages
│   ├── home/           # Home page showing all albums
│   └── favorites/      # Favorites page showing saved albums
├── components/         # Reusable UI components
├── context/           # React Context providers
└── types/           # TypeScript type definitions
```

## Getting Started

First, install the dependencies:

```bash
npm install
# orß
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Key Components

- **AlbumContainer**: Main container component that manages album data and search functionality
- **AlbumGrid**: Responsive grid layout for displaying album cards
- **AlbumCard**: Individual album card with image, details, and favorite button
- **Searchbar**: Real-time search input for filtering albums
- **FavoriteButton**: Toggle button for managing favorite albums

## State Management

The application uses React Context for state management:
- **AlbumsContext**: Manages the fetching and state of all albums
- **FavoriteContext**: Handles the user's favorite albums list

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Deployment

This application can be deployed on [Vercel](https://vercel.com) with zero configuration. Simply connect your GitHub repository to Vercel and it will handle the rest.
