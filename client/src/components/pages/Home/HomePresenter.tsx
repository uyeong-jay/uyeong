import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const HomePresenter: NextPage = () => {
  return (
    <div>
      <Head>
        <title>UYeong</title>
      </Head>
      <h1>Blog Home</h1>
      <main>main</main>
      <footer>footer</footer>
      <Link href={`/blog`}>
        <a>blog button</a>
      </Link>
    </div>
  );
};

export default HomePresenter;
