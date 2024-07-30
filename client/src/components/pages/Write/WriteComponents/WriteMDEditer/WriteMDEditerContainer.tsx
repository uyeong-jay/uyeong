import { BlogPostReq } from '@app/services/blog/postApi';
import React, { ChangeEvent, useCallback } from 'react';
import WriteMDEditerPresenter from './WriteMDEditerPresenter';

interface Props {
  blogPostContent: string;
  setBlogPostInfo: (blogPostInfo: any) => void;
}

const WriteMDEditerContainer = ({ blogPostContent, setBlogPostInfo }: Props) => {
  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setBlogPostInfo((prevBlogPostInfo: BlogPostReq) => ({
        ...prevBlogPostInfo,
        content: newContent,
      }));
    },
    [setBlogPostInfo],
  );

  return <WriteMDEditerPresenter blogPostContent={blogPostContent} onChangeTextarea={onChangeTextarea} />;
};

export default WriteMDEditerContainer;
