import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StyledBlogPostCard } from './BlogPostCardStyle';
import { BlogPost } from '@app/services/blog/postApi';
import foramtDate from '@utils/formatDate';

interface Props {
  post: BlogPost;
}

const BlogPostCardPresenter = ({ post }: Props) => {
  const { /* _id, */ title, tags, /* content,  */ thumbnail, description, /* privacy, */ createdAt, category } = post;

  return (
    <StyledBlogPostCard>
      {thumbnail && (
        <div className="thumbnail-image-wrapper thumbnail-image">
          {
            <Image
              className="thumbnail-image"
              src={thumbnail as string}
              alt="thumbnail-image"
              width={280}
              height={185}
            />
          }
        </div>
      )}
      <div className={`post-card-contents ${thumbnail && 'post-card-contents-with-thumbnail'}`}>
        <h3 className="post-card-title">
          <Link href={`/blog/${title}`}>{title}</Link>
        </h3>
        <p className="post-card-description">{description}</p>
        <p className="post-card-tags">{tags}</p>
        <p className="post-card-category">{category.name}</p>

        <div className="post-card-right-bottom-group">
          <p className="post-card-date">{foramtDate(createdAt)}</p>
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
