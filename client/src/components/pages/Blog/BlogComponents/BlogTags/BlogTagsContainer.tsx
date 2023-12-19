import React, { useMemo } from 'react';
import BlogTagsPresenter from './BlogTagsPresenter';
import { useGetBlogPostsQuery } from '@app/services/blog/postApi';

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
  const { data: blogPostsData } = useGetBlogPostsQuery();

  // 모든 태그 > 많은 순 정렬
  // +50개 로 끊기 (+더보기)
  const allTags = useMemo(() => {
    const tagList: TagWithCount[] = [];
    blogPostsData?.posts?.forEach((post) => {
      post.tags.forEach((postTag: string) => {
        const tagIndex = tagList.findIndex((tag) => tag.name === postTag);

        if (tagIndex !== -1) {
          tagList[tagIndex].count += 1;
        } else tagList.push({ name: postTag, count: 1 });
      });
    });
    return tagList.sort((a, b) => b.count - a.count).slice(0, 50);
  }, [blogPostsData?.posts]);

  return (
    <BlogTagsPresenter
      tagUnderline={tagUnderline}
      onClickTag={onClickTag}
      isTagClicked={isTagClicked}
      allTags={allTags}
    />
  );
};

export default React.memo(BlogTagsContainer);
