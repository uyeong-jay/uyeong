import React from 'react';
import WriteMDFooterPresenter from './WriteMDFooterPresenter';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import { useAppDispatch } from '@app/hooks';
import { done } from '@pages/Write/WriteSlice';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteMDFooterContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const dispatch = useAppDispatch();

  const onClickDone = () => {
    dispatch(done());
  };

  return (
    <WriteMDFooterPresenter blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} onClickDone={onClickDone} />
  );
};

export default WriteMDFooterContainer;
