import { BlogPostReq } from '@app/services/blog/postApi';
import React from 'react';
import PublishURLPresenter from './PublishURLPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
}

const PublishURLContainer = ({ blogPostInfo }: Props) => {
  return <PublishURLPresenter blogPostInfo={blogPostInfo} />;
};

export default PublishURLContainer;
