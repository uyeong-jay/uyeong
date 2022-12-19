import React from 'react';
import { StyledWriteMDViewer } from './WriteMDViewerStyle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import components from '@organisms/MarkdownViewer/components';
import { BlogPostReq } from '@app/services/blog/blogPostApi';

interface Props {
  blogPostInfo: BlogPostReq;
}

const WriteMDViewerPresenter = ({ blogPostInfo }: Props) => {
  return (
    <StyledWriteMDViewer>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {blogPostInfo.content}
      </ReactMarkdown>
    </StyledWriteMDViewer>
  );
};

export default WriteMDViewerPresenter;
