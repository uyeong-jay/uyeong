import React from 'react';
import NavLinkBox from '@molecules/NavLinkBox';
import { StyledBlogHeader, StyledBlogHeaderNav } from './BlogHeaderStyle';

const BlogHeader = () => {
  return (
    <StyledBlogHeader>
      <h3>UYeong Blog</h3>
      <p>제 블로그에 오신걸 환영합니다 🙂👋</p>
      <p>검색바</p>
      <StyledBlogHeaderNav>
        <ul>
          <NavLinkBox href="/blog">Post</NavLinkBox>
          <NavLinkBox href="/blog/category">Category</NavLinkBox>
        </ul>
      </StyledBlogHeaderNav>
    </StyledBlogHeader>
  );
};

export default BlogHeader;
