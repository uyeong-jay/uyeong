import React, { useMemo } from 'react';
import { BlogPost, useGetBlogPostsByCategoryQuery } from '@app/services/blog/postApi';
import { useRouter } from 'next/router';
import BlogCategoryDetailPresenter from './BlogCategoryDetailPresenter';
import { useGetBlogCategoriesQuery } from '@app/services/blog/categoryApi';

interface PostsByCategory {
  postsByCategory?: BlogPost[];
}

const BlogCategoryDetailContainer = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: blogPostsByCategoryData } = useGetBlogPostsByCategoryQuery(slug as string);
  const { data: blogCategoryData /* , isLoading, isSuccess, error */ } = useGetBlogCategoriesQuery();

  const { postsByCategory }: PostsByCategory = blogPostsByCategoryData || {};

  const categoryBySlug = useMemo(() => {
    const categoryData = blogCategoryData?.categories?.find((category) => category.name === slug);
    return categoryData;
  }, [blogCategoryData?.categories, slug]);

  return <BlogCategoryDetailPresenter categoryBySlug={categoryBySlug} postsByCategory={postsByCategory} />;
};

export default BlogCategoryDetailContainer;
