import React, { useCallback } from 'react';
import { DIV, HEADER } from './BlogHeaderStyle';
import { useRouter } from 'next/router';

const BlogHeaderPresenter = () => {
  const router = useRouter();

  const onClickPost = useCallback(() => {
    router.push('/blog', undefined, { scroll: false });
  }, [router]);
  const onClickCategory = useCallback(() => {
    router.push('/blog/category', undefined, { scroll: false });
  }, [router]);

  return (
    <HEADER.Frame>
      <DIV.HeaderBlock routerPathname={router.pathname}>
        <ul>
          <li onClick={onClickPost}>Post</li>
          <li onClick={onClickCategory}>Category</li>
        </ul>
        <div>
          <span>UYeong</span>
        </div>
      </DIV.HeaderBlock>
    </HEADER.Frame>
  );
};

export default BlogHeaderPresenter;
