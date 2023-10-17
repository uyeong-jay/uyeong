import { BlogPostReq } from '@app/services/blog/postApi';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import WriteMDEditerPresenter from './WriteMDEditerPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteMDEditerContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const [content, setContent] = useState(blogPostInfo.content);

  const memoizedContent = useMemo(() => {
    return content;
  }, [content]);

  const onChangeTextarea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);
      setBlogPostInfo({ ...blogPostInfo, content: newContent });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return (
    <WriteMDEditerPresenter
      blogPostInfo={blogPostInfo}
      memoizedContent={memoizedContent}
      onChangeTextarea={onChangeTextarea}
    />
  );
};

export default WriteMDEditerContainer;
