import React, { ChangeEvent, RefObject } from 'react';
import NavLinkBox from '@molecules/NavLinkBox';
import { StyledBlogHeader, StyledBlogHeaderNav } from './BlogHeaderStyle';

interface Props {
  searchWordInput?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickInput?: () => void;
  inputRef?: RefObject<HTMLInputElement>;
}

const BlogHeaderPresenter = ({ searchWordInput, onChangeInput, onClickInput, inputRef }: Props) => {
  return (
    <StyledBlogHeader>
      <h3>UYeong Blog</h3>
      <p>제 블로그에 오신걸 환영합니다 🙂👋</p>
      {/* input 커서 시 전체 선택 되도록 하기 */}
      <input
        type="search"
        /* name */ value={searchWordInput}
        onChange={onChangeInput}
        onClick={onClickInput}
        ref={inputRef}
        placeholder="Search"
      />
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
