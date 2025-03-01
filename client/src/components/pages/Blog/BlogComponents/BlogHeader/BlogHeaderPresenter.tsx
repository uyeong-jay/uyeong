import React, { useCallback } from 'react';
import { DIV, HEADER } from './BlogHeaderStyle';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@app/hooks';
import { getTagName } from '@pages/Blog/BlogSlice';
import Head from 'next/head';

const BlogHeaderPresenter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClickPost = useCallback(() => {
    router.push('/blog', undefined, { scroll: false });
  }, [router]);

  const onClickCategory = useCallback(() => {
    router.push('/blog/category', undefined, { scroll: false });
    dispatch(getTagName(''));
  }, [dispatch, router]);

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/subset-SquarePeg-Regular.woff2" as="font" crossOrigin="anonymous" />
      </Head>

      <HEADER.Frame>
        <DIV.HeaderBlock routerPathname={router.pathname}>
          <ul>
            <li>
              <span onClick={onClickPost}>Post</span>
            </li>
            <li>
              <span onClick={onClickCategory}>Category</span>
            </li>
          </ul>
          <div>
            <span>UYeong</span>
          </div>
        </DIV.HeaderBlock>
      </HEADER.Frame>
    </>
  );
};

export default BlogHeaderPresenter;
