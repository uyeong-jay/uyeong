import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { UserResponse } from '@app/services/user/userApi';
import BlogCategoryHeaderPresenter from './BlogCategoryHeaderPresenter';
import { useCreateBlogCategoryMutation } from '@app/services/blog/categoryApi';

interface Props {
  userData?: UserResponse;
}

const BlogCategoryHeaderContainer = ({ userData }: Props) => {
  //Craeting Category
  const [createBlogCategory, { error: createBlogCategoryError }] = useCreateBlogCategoryMutation();
  const initialState = { name: '' };
  const [categoryInfo, setCategoryInfo] = useState(initialState);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      createBlogCategory({ categoryInfo, token: userData?.access_token });

      setCategoryInfo({ name: '' });
    },
    [categoryInfo, createBlogCategory, userData?.access_token],
  );

  const onChangeCategoryName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ name: e.target.value });
  }, []);

  return (
    <BlogCategoryHeaderPresenter
      userData={userData}
      categoryInfo={categoryInfo}
      onSubmit={onSubmit}
      onChangeCategoryName={onChangeCategoryName}
      createBlogCategoryError={createBlogCategoryError}
    />
  );
};

export default BlogCategoryHeaderContainer;
