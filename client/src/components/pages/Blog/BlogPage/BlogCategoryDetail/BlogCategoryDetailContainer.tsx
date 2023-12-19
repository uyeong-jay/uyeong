import React from 'react';
import { BlogPost, useGetBlogPostsByCategoryQuery } from '@app/services/blog/postApi';
import { useRouter } from 'next/router';
import BlogCategoryDetailPresenter from './BlogCategoryDetailPresenter';

interface PostsByCategory {
  postsByCategory?: BlogPost[];
}

const BlogCategoryDetailContainer = () => {
  const router = useRouter();
  const { slug: categoryTitle } = router.query;
  const { data: blogPostsByCategoryData } = useGetBlogPostsByCategoryQuery(categoryTitle as string);

  const { postsByCategory }: PostsByCategory = blogPostsByCategoryData || {};

  return <BlogCategoryDetailPresenter categoryTitle={categoryTitle} postsByCategory={postsByCategory} />;
};

export default BlogCategoryDetailContainer;
