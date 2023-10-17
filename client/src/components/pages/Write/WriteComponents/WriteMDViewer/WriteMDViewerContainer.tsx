import { BlogPostReq } from '@app/services/blog/postApi';
import React, { useMemo, useState } from 'react';
import WriteMDViewerPresenter from './WriteMDViewerPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
}

const WriteMDViewerContainer = ({ blogPostInfo }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState(blogPostInfo.content);

  const memoizedContent = useMemo(() => {
    return content;
  }, [content]);

  return <WriteMDViewerPresenter blogPostInfo={blogPostInfo} memoizedContent={memoizedContent} />;
};

export default WriteMDViewerContainer;
