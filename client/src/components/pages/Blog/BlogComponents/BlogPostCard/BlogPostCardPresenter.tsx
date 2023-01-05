import React from 'react';
import Link from 'next/link';
import { StyledBlogPostCard } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import foramtDate from '@utils/formatDate';

interface Props {
  post: BlogPost;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const { /* _id, user, */ title, tags, /* content, thumbnail, */ description, /* privacy, createdAt, */ category } =
    post;

  return (
    <StyledBlogPostCard>
      <h3>
        제목: <Link href={`/blog/${title}`}>{title}</Link>
      </h3>
      <p>설명: {description}</p>
      <p>날짜: {foramtDate(category.createdAt)}</p>
      <p>태그: {tags}</p>
      <p>카테고리: {category.name}</p>
    </StyledBlogPostCard>
  );
};

export default BlogPostCardPresenter;
