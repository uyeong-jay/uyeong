import { useAppSelector } from '@app/hooks';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import React from 'react';
import PublishPresenter from './PublishPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const isPublish = useAppSelector((state) => state.write.isPublish);

  return <PublishPresenter blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} isPublish={isPublish} />;
};

export default PublishContainer;
