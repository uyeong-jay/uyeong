import React from 'react';
import Link from 'next/link';
import styled from '@_settings/styled';
import { BlogPostsProps } from '@_types/types-blog';

interface Props {
  post: BlogPostsProps;
}

const StyledBlogPostCard = styled.article`
  //background-color: #efe9e0;
  border: 1px solid #dadada;
  width: 200px;
  height: 300px;
  margin: 10px;
  padding: 10px;
  border-radius: 30px;
`;

const BlogPostCard = ({ post }: Props) => {
  const { slug, title, description, date, tags } = post;

  return (
    <StyledBlogPostCard key={slug}>
      <h3>
        제목: <Link href={`/blog/post/${slug}`}>{title}</Link>
      </h3>
      <p>설명: {description}</p>
      <p>날짜: {date}</p>
      <p>태그: {tags}</p>
    </StyledBlogPostCard>
  );
};

export default BlogPostCard;
