import { ChangeEvent, useCallback, useState } from 'react';
import BlogCategoryCardPresenter from './BlogCategoryCardPresenter';

import { useUpdateBlogCategoryMutation, useDeleteBlogCategoryMutation } from '@app/services/blog/categoryApi';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData: UserResponse | undefined;
  category: {
    name: string;
    createdAt: string;
  };
}

const BlogCategoryCard = ({ category, userData }: Props) => {
  const [updateBlogCategory, { error }] = useUpdateBlogCategoryMutation();
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation();
  const { name: cardName } = category;

  const [isUpdate, setIsUpdate] = useState(false);

  const [categoryName, setCategoryName] = useState({ name: cardName });

  //Save category name
  const onClickSave = useCallback(
    async (cardName, currName) => {
      await updateBlogCategory({
        categoryName: { ...categoryName, name: cardName, currName },
        token: userData?.access_token,
      });

      setCategoryName({ name: currName });
      setIsUpdate(false);
    },
    [categoryName, updateBlogCategory, userData?.access_token],
  );

  //Delete category
  const onClickDelete = useCallback(
    (cardName) => {
      deleteBlogCategory({
        categoryInfo: { name: cardName },
        token: userData?.access_token,
      });
    },
    [deleteBlogCategory, userData?.access_token],
  );

  //Edit category name
  const onClickEdit = () => setIsUpdate(true);

  //Change category name Input
  const onChangeCategoryNameInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName({ name: e.target.value });
  }, []);

  return (
    <BlogCategoryCardPresenter
      userData={userData}
      category={category}
      cardName={cardName}
      categoryName={categoryName}
      isUpdate={isUpdate}
      error={error}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      onClickSave={onClickSave}
      onChangeCategoryNameInput={onChangeCategoryNameInput}
    />
  );
};

export default BlogCategoryCard;
