import React from 'react';
import WriteMDViewerPresenter from './WriteMDViewerPresenter';

interface Props {
  blogPostContent: string;
}

const WriteMDViewerContainer = ({ blogPostContent }: Props) => {
  return <WriteMDViewerPresenter blogPostContent={blogPostContent} />;
};

export default WriteMDViewerContainer;
