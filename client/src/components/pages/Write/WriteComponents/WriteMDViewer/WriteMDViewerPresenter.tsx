import React from 'react';
import { StyledWriteMDViewer } from './WriteMDViewerStyle';
import { BlogPostReq } from '@app/services/blog/postApi';
import MarkdownViewer from '@organisms/MarkdownViewer';

interface Props {
  blogPostInfo: BlogPostReq;
}

const WriteMDViewerPresenter = ({ blogPostInfo }: Props) => {
  return (
    <StyledWriteMDViewer>
      <MarkdownViewer content={blogPostInfo.content} />
    </StyledWriteMDViewer>
  );
};

export default WriteMDViewerPresenter;
