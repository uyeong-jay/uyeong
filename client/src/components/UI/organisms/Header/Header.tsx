import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/signin">Join</Link>
            </li>
            <li>
              <Link href="/">로고 UYeong</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
