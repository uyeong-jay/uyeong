import { useAppSelector } from '@app/hooks';
import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import React from 'react';
import PublishPresenter from './PublishPresenter';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishContainer = ({ userData, blogPostInfo, setBlogPostInfo }: Props) => {
  const isPublishing = useAppSelector((state) => state.write.isPublishing);

  return (
    <PublishPresenter
      userData={userData}
      blogPostInfo={blogPostInfo}
      setBlogPostInfo={setBlogPostInfo}
      isPublishing={isPublishing}
    />
  );
};

export default PublishContainer;
