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
      const newContent = e.target.value;
      setBlogPostInfo({
        ...blogPostInfo,
        content: newContent,
      });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return <WriteMDEditerPresenter blogPostContent={blogPostInfo.content} onChangeTextarea={onChangeTextarea} />;
};

export default WriteMDEditerContainer;
