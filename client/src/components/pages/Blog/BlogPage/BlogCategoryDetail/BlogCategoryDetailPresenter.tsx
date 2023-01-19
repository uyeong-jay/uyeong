import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import { StyledBlogCategoryDetail } from './BlogCategoryDetailStyle';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@utils/formatDate';
import { BlogCategory } from '@app/services/blog/categoryApi';
import NotFound from '@src/pages/404';

interface Props {
  categoryBySlug?: BlogCategory;
  postsByCategory?: BlogPost[];
}

const BlogCategoryDetailPresenter = ({ categoryBySlug, postsByCategory }: Props) => {
  if (!categoryBySlug) return <NotFound />;
  return (
    <StyledBlogCategoryDetail>
      {/* 카테고리 제목 */}
      <h1 className="category-title">{categoryBySlug.name}</h1>
      <div className="post-card-by-category-block">
        {postsByCategory?.map((post) => (
          <div
            className="post-card-by-category"
            key={post._id}
            style={{ border: `${!post.thumbnail ? '1px solid rgba(0, 0, 0, 0.5)' : 'none'}` }}
          >
            {post.thumbnail && (
              <div className="blog-category-image-wrapper blog-category-image">
                {
                  <Image
                    className="blog-category-image"
                    src={post.thumbnail as string}
                    alt="blog-category-image"
                    width={400}
                    height={270}
                  />
                }
              </div>
            )}
            <h3 className="post-card-title">
              <Link href={`/blog/${post.titleForUrl}`}>{post.title}</Link>
            </h3>
            <p className="post-card-description">{post.description}</p>
            <p className="post-card-date">{formatDate(post.createdAt)}</p>
          </div>
        ))}
      </div>
    </StyledBlogCategoryDetail>
  );
};

export default BlogCategoryDetailPresenter;
