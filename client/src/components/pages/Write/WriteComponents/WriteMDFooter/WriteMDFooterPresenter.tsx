import { BlogPostReq } from '@app/services/blog/blogPostApi';
import React from 'react';
import Publish from '../Publish';
import { StyledWriteMDFooter } from './WriteMDFooterStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  onClickDone: () => void;
}

const WriteMDFooterPresenter = ({ blogPostInfo, setBlogPostInfo, onClickDone }: Props) => {
  return (
    <StyledWriteMDFooter>
      <button>나가기</button>
      <button>임시저장</button>
      <Publish blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
      <button onClick={onClickDone}>완료</button>
    </StyledWriteMDFooter>
  );
};

export default WriteMDFooterPresenter;
