import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import BlogCategoryPresenter from './BlogCategoryPresenter';
import { useGetUserDataQuery } from '@app/services/userApi';
import {
  useGetBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} from '@app/services/blogApi/blogCategoryApi';

const CategoryContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const { data: blogCategoryData /* , isLoading, isSuccess, error */ } = useGetBlogCategoriesQuery();
  const [createBlogCategory] = useCreateBlogCategoryMutation();
  const [updateBlogCategory] = useUpdateBlogCategoryMutation();
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation();

  //Craete Category
  const initialState = { name: '' };
  const [categoryInfo, setCategoryInfo] = useState(initialState);

  //Update Name
  const [categoryName, setCategoryName] = useState({ name: '' });

  //Create Category
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      createBlogCategory({ categoryInfo, token: userData?.access_token });

      setCategoryInfo({ name: '' });
    },
    [categoryInfo, createBlogCategory, userData?.access_token],
  );

  //Update Category
  const onClickSave = useCallback(
    async (cardName, currName) => {
      await updateBlogCategory({
        categoryName: { ...categoryName, name: cardName, currName },
        token: userData?.access_token,
      });

      setCategoryName({ name: '' });
    },
    [categoryName, updateBlogCategory, userData?.access_token],
  );

  //Delete Category
  const onClickDelete = useCallback(
    (cardName) => {
      deleteBlogCategory({
        categoryInfo: { name: cardName },
        token: userData?.access_token,
      });
    },
    [deleteBlogCategory, userData?.access_token],
  );

  //Create Input
  const onChangeCategoryInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ name: e.target.value });
  }, []);

  //Update Input
  const onChangeCateogoryNameInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName({ name: e.target.value });
  }, []);

  return (
    <BlogCategoryPresenter
      userData={userData}
      blogCategoryData={blogCategoryData}
      categoryInfo={categoryInfo}
      categoryName={categoryName}
      onSubmit={onSubmit}
      onChangeCategoryInput={onChangeCategoryInput}
      onChangeCateogoryNameInput={onChangeCateogoryNameInput}
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
    />
  );
};

export default CategoryContainer;
