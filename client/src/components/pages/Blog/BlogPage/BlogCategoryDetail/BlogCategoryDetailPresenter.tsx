import { BlogPostRes } from '@app/services/blog/postApi';
import React, { RefObject } from 'react';
import { SECTION, DIV } from './BlogCategoryDetailStyle';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@utils/formatDate';
import Logo from '@icons/Logo';
import MiniLoader from '@modals/MiniLoader';
import { v4 as uuid } from 'uuid';

interface Props {
  blogPostsByCategory: BlogPostRes;
  categoryTitle: string | string[] | undefined;
  isFetchingPosts: boolean;
  canLoadMore: boolean;
  isLoadingPosts: boolean;
  targetRef: RefObject<HTMLDivElement>;
}

const POSTCOUNT = 2;
export const InitialPostsCardArr = Array.from({ length: POSTCOUNT }, (_, index) => index);

const BlogCategoryDetailPresenter = ({
  blogPostsByCategory,
  categoryTitle,
  isFetchingPosts,
  canLoadMore,
  isLoadingPosts,
  targetRef,
}: Props) => {
  const headerTitle = categoryTitle ? (categoryTitle as string) : '';

  return (
    <SECTION.Frame>
      <h1>
        <span>{headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1)}</span>
      </h1>
      <span></span>

      <DIV.PostCardBlcok hasPost={blogPostsByCategory?.postsByCategory ? true : false}>
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
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
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
              //limit 와 가져온 post 개수가 서로 같을때
              <div key={uuid()}></div>
            ),
          )
        ) : isFetchingPosts ? (
          //첫화면 or 새로고침시
          <DIV.LoaderWrapper>
            <MiniLoader w={30} responsive />
          </DIV.LoaderWrapper>
        ) : (
          // 포스트 없을때
          <DIV.NoPost>- No post yet -</DIV.NoPost>
        )}
      </DIV.PostCardBlcok>
      <DIV.IntersectionTarget id="posts_by_category_intersection_target" ref={targetRef}>
        {isLoadingPosts ? (
          <MiniLoader w={30} responsive />
        ) : canLoadMore ? (
          //limit 와 가져온 post 개수가 서로 같을때
          !blogPostsByCategory?.next_cursor && <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
        ) : (
          //새로고침 후
          !blogPostsByCategory?.next_cursor &&
          blogPostsByCategory?.hasMatchingPost && <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
        )}
      </DIV.IntersectionTarget>
    </SECTION.Frame>
  );
};

export default BlogCategoryDetailPresenter;
