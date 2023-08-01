import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import BlogCategoryPresenter from './BlogCategoryPresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useGetBlogCategoriesQuery, useCreateBlogCategoryMutation } from '@app/services/blog/categoryApi';
import { useGetBlogPostsQuery } from '@app/services/blog/postApi';

const BlogCategoryContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const { data: blogCategoryData /* , isLoading, isSuccess, error */ } = useGetBlogCategoriesQuery();
  const { data: blogPostsData } = useGetBlogPostsQuery();
  const [createBlogCategory, { error }] = useCreateBlogCategoryMutation();

  //Craete Category
  const initialState = { name: '' };
  const [categoryInfo, setCategoryInfo] = useState(initialState);

  //Create Category
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      createBlogCategory({ categoryInfo, token: userData?.access_token });

      setCategoryInfo({ name: '' });
    },
    [categoryInfo, createBlogCategory, userData?.access_token],
  );

  //Create Input
  const onChangeCategoryInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ name: e.target.value });
  }, []);

  return (
    <BlogCategoryPresenter
      userData={userData}
      blogPostsData={blogPostsData}
      blogCategoryData={blogCategoryData}
      categoryInfo={categoryInfo}
      error={error}
      onSubmit={onSubmit}
      onChangeCategoryInput={onChangeCategoryInput}
    />
  );
};

export default BlogCategoryContainer;
