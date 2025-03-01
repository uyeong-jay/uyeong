import React from 'react';
import BlogTagsPresenter from './BlogTagsPresenter';
import { useGetBlogTagsQuery } from '@app/services/blog/tagApi';

export interface TagWithCount {
  name: string;
  count: number;
}

export interface Props {
  tagUnderline: string;
  onClickTag: (tagName: string) => void;
  isTagClicked: boolean;
}

const BlogTagsContainer = ({ tagUnderline, onClickTag, isTagClicked }: Props) => {
  const { data: blogTagsData } = useGetBlogTagsQuery({ limit: 50 });

  return (
    <BlogTagsPresenter
      tagUnderline={tagUnderline}
      onClickTag={onClickTag}
      isTagClicked={isTagClicked}
      blogTagsData={blogTagsData}
    />
  );
};

export default React.memo(BlogTagsContainer);
