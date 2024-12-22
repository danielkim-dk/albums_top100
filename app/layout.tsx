import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import { FavoriteProvider } from './context/FavoriteContext';
import { AlbumsProvider } from './context/AlbumsContext';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Beats Chart Top 100',
  description: 'Get the current top 100 albums on the Beats Chart',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} antialiased`}>
        <AlbumsProvider>
          <FavoriteProvider>{children}</FavoriteProvider>
        </AlbumsProvider>
      </body>
    </html>
  );
}
