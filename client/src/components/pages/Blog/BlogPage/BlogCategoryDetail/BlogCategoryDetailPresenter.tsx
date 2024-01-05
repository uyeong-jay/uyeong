import { BlogPostRes } from '@app/services/blog/postApi';
import React, { RefObject } from 'react';
import { DIV } from './BlogCategoryDetailStyle';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@utils/formatDate';
import { SubFrame } from '@templates/SubFrame';
import Logo from '@icons/Logo';
import MiniLoader from '@modals/MiniLoader';
import { v4 as uuid } from 'uuid';

interface Props {
  blogPostsByCategory: BlogPostRes;
  categoryTitle: string | string[] | undefined;
  targetRef: RefObject<HTMLDivElement>;
  canLoadMore: boolean;
  isLoadingPosts: boolean;
}

const POSTCOUNT = 6;
export const InitialPostsCardArr = Array.from({ length: POSTCOUNT }, (_v, index) => index);

const BlogCategoryDetailPresenter = ({
  blogPostsByCategory,
  categoryTitle,
  targetRef,
  canLoadMore,
  isLoadingPosts,
}: Props) => {
  const headerTitle = categoryTitle ? (categoryTitle as string) : '';
  return (
    <DIV.Frame>
      <SubFrame>
        {/* 카테고리 제목 */}
        <h1>{headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1)}</h1>
        <DIV.PostCardBlcok>
          {blogPostsByCategory?.postsByCategory ? (
            blogPostsByCategory.postsByCategory.map((post) =>
              post ? (
                <DIV.PostCard key={post._id}>
                  <h3>
                    <Link href={`/blog/${post.titleForUrl}`}>
                      {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                    </Link>
                  </h3>

                  <div className="blog-post-card-image-wrapper">
                    {post.thumbnail ? (
                      <Image
                        className="blog-post-card-image"
                        src={post.thumbnail as string}
                        alt="blog-post-card-image"
                        layout="fill"
                        objectFit="contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div>
                        <Logo />
                      </div>
                    )}
                  </div>

                  <span>{formatDate(post.createdAt)}</span>
                </DIV.PostCard>
              ) : (
                //limit 와 가져온 post 개수가 서로 딱 맞아 떨어질때
                <div key={uuid()}></div>
              ),
            )
          ) : (
            //새로고침시 or 포스트가 없을때 보이는 화면
            <>
              {InitialPostsCardArr.map((cardCountIndex) => (
                <DIV.InitialPostsCard key={cardCountIndex}></DIV.InitialPostsCard>
              ))}
            </>
          )}
        </DIV.PostCardBlcok>
        <DIV.IntersectionTarget id="posts_by_category_intersection_target" ref={targetRef}>
          {isLoadingPosts ? (
            <MiniLoader />
          ) : canLoadMore ? (
            //limit 와 가져온 post 개수가 서로 딱 맞아 떨어질때
            !blogPostsByCategory?.next_cursor && <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
          ) : (
            //새로고침 후
            !blogPostsByCategory?.next_cursor &&
            blogPostsByCategory?.hasMatchingPost && <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
          )}
        </DIV.IntersectionTarget>
      </SubFrame>
    </DIV.Frame>
  );
};

export default BlogCategoryDetailPresenter;
