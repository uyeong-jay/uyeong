import React, { ChangeEvent } from 'react';
import NavLinkBox from '@molecules/NavLinkBox';
import { StyledBlogHeader, StyledBlogHeaderNav } from './BlogHeaderStyle';

interface Props {
  search?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BlogHeaderPresenter = ({ search, onChangeInput }: Props) => {
  return (
    <StyledBlogHeader>
      <h3>UYeong Blog</h3>
      <p>제 블로그에 오신걸 환영합니다 🙂👋</p>
      <input type="search" /* name */ value={search} onChange={onChangeInput} placeholder="Search" />
      <StyledBlogHeaderNav>
        <ul>
          <NavLinkBox href="/blog">Post</NavLinkBox>
          <NavLinkBox href="/blog/category">Category</NavLinkBox>
        </ul>
      </StyledBlogHeaderNav>
    </StyledBlogHeader>
  );
};

export default BlogHeaderPresenter;
