'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  {
    name: 'Top Albums',
    href: '/home',
  },
  {
    name: 'Favorites',
    href: '/favorites',
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-screen min-w-full h-16 bg-white border-b border-black sticky top-0 z-20">
      <div className="h-full max-w-7xl mx-auto px-4">
        <ul className="h-full flex items-center justify-center gap-4">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`border border-white hover:border hover:border-black p-2 rounded-lg transition-colors ${
                pathname === item.href ? 'bg-black text-white' : ''
              }`}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
