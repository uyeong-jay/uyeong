import { BlogPostReq } from '@app/services/blog/postApi';
import React from 'react';
import { DIV } from './PublishURLStyle';

interface Props {
  blogPostInfo: BlogPostReq;
}

const PublishURLPresenter = ({ blogPostInfo }: Props) => {
  const { title } = blogPostInfo;
  return (
    <DIV.PublishURL>
      <div>
        <span>URL</span>
        <span>|</span>
        <span>/</span>
        <span>blog</span>
        <span>/</span>
        <span>{title ?? ''}</span>
      </div>
    </DIV.PublishURL>
  );
};

export default PublishURLPresenter;
