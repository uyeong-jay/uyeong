import { BlogPostReq } from '@app/services/blog/postApi';
import React, { ChangeEvent, useCallback } from 'react';
import WriteMDEditerPresenter from './WriteMDEditerPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteMDEditerContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setBlogPostInfo({ ...blogPostInfo, content: e.target.value });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return <WriteMDEditerPresenter blogPostInfo={blogPostInfo} onChangeTextarea={onChangeTextarea} />;
};

export default WriteMDEditerContainer;
