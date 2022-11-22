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

  const initialState = { name: '', token: userData?.access_token };
  const [blogCategoryInfo, setBlogCategoryInfo] = useState(initialState);

  console.log(blogCategoryData, blogCategoryInfo);

  //Create Category
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      createBlogCategory(blogCategoryInfo);
    },
    [blogCategoryInfo, createBlogCategory],
  );

  //Update Category
  const onClickUpdate = useCallback(() => {
    ``;
    updateBlogCategory(blogCategoryInfo);
  }, [blogCategoryInfo, updateBlogCategory]);

  //Delete Category
  const onClickDelete = useCallback(() => {
    deleteBlogCategory(blogCategoryInfo);
  }, [blogCategoryInfo, deleteBlogCategory]);

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBlogCategoryInfo({ ...blogCategoryInfo, name: e.target.value });
    },
    [blogCategoryInfo],
  );

  return (
    <BlogCategoryPresenter
      userData={userData}
      onSubmit={onSubmit}
      onChangeInput={onChangeInput}
      blogCategoryInfo={blogCategoryInfo}
      blogCategoryData={blogCategoryData}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
    />
  );
};

export default CategoryContainer;
