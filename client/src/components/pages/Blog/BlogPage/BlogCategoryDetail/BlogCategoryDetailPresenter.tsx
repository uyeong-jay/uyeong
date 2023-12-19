import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import { DIV } from './BlogCategoryDetailStyle';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@utils/formatDate';
import NotFound from '@src/pages/404';
import { SubFrame } from '@templates/SubFrame';
import Logo from '@icons/Logo';

interface Props {
  categoryTitle: string | string[] | undefined;
  postsByCategory?: BlogPost[];
}

const BlogCategoryDetailPresenter = ({ categoryTitle, postsByCategory }: Props) => {
  if (!postsByCategory) return <NotFound />;
  const headerTitle = categoryTitle ? (categoryTitle as string) : '';
  return (
    <DIV.Frame>
      <SubFrame>
        {/* 카테고리 제목 */}
        <h1>{headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1)}</h1>
        <DIV.PostCardBlcok>
          {postsByCategory?.map((post) => (
            <DIV.PostCard key={post._id}>
              <div className="blog-post-card-image-wrapper blog-post-card-image">
                {post.thumbnail ? (
                  <Image
                    className="blog-post-card-image"
                    src={post.thumbnail as string}
                    alt="blog-post-card-image"
                    layout="fill"
                    objectFit="cover" //이미지를 틀에 맞게 맞추기
                    priority
                  />
                ) : (
                  <div>
                    <Logo />
                  </div>
                )}
              </div>

              <h3>
                <Link href={`/blog/${post.titleForUrl}`}>{post.title}</Link>
              </h3>
              <span>{formatDate(post.createdAt)}</span>
            </DIV.PostCard>
          ))}
        </DIV.PostCardBlcok>
      </SubFrame>
    </DIV.Frame>
  );
};

export default BlogCategoryDetailPresenter;
