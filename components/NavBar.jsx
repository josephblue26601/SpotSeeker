
import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white p-4 shadow-2xl">
      <ul className="flex items-center justify-between">
        <li className="text-4xl text-black font-bold">
          <Link href="/">SpotSeeker</Link>
        </li>
        


      </ul>
    </nav>
  );
}
