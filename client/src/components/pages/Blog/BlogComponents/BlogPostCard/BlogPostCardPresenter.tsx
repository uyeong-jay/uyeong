import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StyledBlogPostCard } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import formatDate from '@utils/formatDate';

interface Props {
  post: BlogPost;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const {
    /* _id, */ titleForUrl,
    title,
    tags,
    /* content,  */ thumbnail,
    description,
    /* privacy, */ createdAt,
    category,
  } = post;

  return (
    <StyledBlogPostCard>
      {thumbnail && (
        <div className="blog-card-image-wrapper blog-card-image">
          {
            <Image
              className="blog-card-image"
              src={thumbnail as string}
              alt="blog-card-image"
              width={280}
              height={185}
            />
          }
        </div>
      )}
      <div className={`post-card-contents ${thumbnail && 'post-card-contents-with-thumbnail'}`}>
        <h3 className="post-card-title">
          <Link href={`/blog/${titleForUrl}`}>{title}</Link>
        </h3>
        <p className="post-card-description">{description}</p>
        <p className="post-card-tags">{tags}</p>
        {category && <p className="post-card-category">{category}</p>}

        <div className="post-card-right-bottom-group">
          <p className="post-card-date">{formatDate(createdAt)}</p>
          <span className="post-card-middot">&middot;</span>
          <p className="post-card-comment">ㅁ개의 댓글</p>
          <span className="post-card-middot">&middot;</span>
          <p className="post-card-star">별 ㅁ</p>
        </div>
      </div>
    </StyledBlogPostCard>
  );
};

export default BlogPostCardPresenter;
