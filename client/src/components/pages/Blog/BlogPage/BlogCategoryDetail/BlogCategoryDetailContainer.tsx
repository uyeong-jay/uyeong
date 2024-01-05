import React, { useEffect, useState } from 'react';
import { useGetBlogPostsByCategoryQuery } from '@app/services/blog/postApi';
import { useRouter } from 'next/router';
import BlogCategoryDetailPresenter from './BlogCategoryDetailPresenter';
import { useIntersect } from '@hooks/useIntersect';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { getMorePostsByCategory, getPostsByCategory } from '@pages/Blog/BlogSlice';

const BlogCategoryDetailContainer = () => {
  const router = useRouter();
  const { slug: categoryTitle } = router.query;

  const dispatch = useAppDispatch();
  const blogPostsByCategory = useAppSelector((state) => state.blog.blogPostsByCategory);

  const initialPostPagingInfoByCategory = {
    categoryTitle,
    nextPageId: '',
  };
  const [postsPagingInfo, setPostsPagingInfo] = useState(initialPostPagingInfoByCategory);
  const { data: blogPostsDataByCategory, isFetching: isFetchingPosts } =
    useGetBlogPostsByCategoryQuery(postsPagingInfo);

  const [isIntersectionEnded, setIntersectionEnded] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isLoadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (canLoadMore) {
      const timer = setTimeout(() => {
        dispatch(getMorePostsByCategory(blogPostsDataByCategory));
        setIntersectionEnded(false);
        setLoadingPosts(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      dispatch(getPostsByCategory(blogPostsDataByCategory));
    }
  }, [blogPostsDataByCategory, canLoadMore, dispatch]);

  //infinite scroll hook with IntersectionObserver
  const targetRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      //서버에서 받아온 next_cursor 가 있을때 실행
      if (!isFetchingPosts && blogPostsDataByCategory?.next_cursor && !isIntersectionEnded) {
        setIntersectionEnded(true);
        setCanLoadMore(true);
        setLoadingPosts(true);
        setPostsPagingInfo({
          ...postsPagingInfo,
          nextPageId: blogPostsDataByCategory.next_cursor,
        });
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    },
    'posts_by_category_intersection_target',
  );

  return (
    <BlogCategoryDetailPresenter
      blogPostsByCategory={blogPostsByCategory}
      categoryTitle={categoryTitle}
      canLoadMore={canLoadMore}
      isLoadingPosts={isLoadingPosts}
      targetRef={targetRef}
    />
  );
};

export default BlogCategoryDetailContainer;
