import { BlogPostReq } from '@app/services/blog/postApi';
import React from 'react';
import PublishPrivacyPresenter from './PublishPrivacyPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishPrivacyContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const onClickPublic = () => {
    if (blogPostInfo.privacy) {
      setBlogPostInfo({ ...blogPostInfo, privacy: false });
    }
  };
  const onClickPrivate = () => {
    if (!blogPostInfo.privacy) {
      setBlogPostInfo({ ...blogPostInfo, privacy: true });
    }
  };

  return (
    <PublishPrivacyPresenter
      blogPostInfo={blogPostInfo}
      onClickPublic={onClickPublic}
      onClickPrivate={onClickPrivate}
    />
  );
};

export default PublishPrivacyContainer;
