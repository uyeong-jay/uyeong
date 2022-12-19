import { BlogPostReq } from '@app/services/blog/blogPostApi';
import React from 'react';
import WriteMDViewerPresenter from './WriteMDViewerPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
}

const WriteMDViewerContainer = ({ blogPostInfo }: Props) => {
  return <WriteMDViewerPresenter blogPostInfo={blogPostInfo} />;
};

export default WriteMDViewerContainer;
