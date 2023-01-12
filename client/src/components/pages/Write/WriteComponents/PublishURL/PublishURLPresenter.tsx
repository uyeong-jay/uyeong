import { BlogPostReq } from '@app/services/blog/postApi';
import React from 'react';
import { StyledPublishURL } from './PublishURLStyle';

interface Props {
  blogPostInfo: BlogPostReq;
}

const PublishURLPresenter = ({ blogPostInfo }: Props) => {
  const { title } = blogPostInfo;
  return (
    <StyledPublishURL>
      <div>
        URL
        <span>|</span>
        <span>/blog/{title ?? ''}</span>
      </div>
    </StyledPublishURL>
  );
};

export default PublishURLPresenter;
