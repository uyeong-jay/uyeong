import React from 'react';
import Link from 'next/link';
import { BlogPostsProps } from '@_types/types-blog';
import { StyledBlogPostCard } from './BlogPostCardStyle';

interface Props {
  post: BlogPostsProps;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const { slug, title, description, date, tags } = post;

  return (
    <StyledBlogPostCard key={slug}>
      <h3>
        제목: <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <p>설명: {description}</p>
      <p>날짜: {date}</p>
      <p>태그: {tags}</p>
    </StyledBlogPostCard>
  );
};

export default BlogPostCardPresenter;
