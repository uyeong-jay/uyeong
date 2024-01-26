import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import BlogCategoryCardPresenter from './BlogCategoryCardPresenter';

import {
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  BlogCategory,
} from '@app/services/blog/categoryApi';
import { UserResponse } from '@app/services/user/userApi';
import { BlogPostRes } from '@app/services/blog/postApi';

interface Props {
  userData?: UserResponse;
  blogPostsData?: BlogPostRes;
  category: BlogCategory;
}

const BlogCategoryCardContainer = ({ userData, blogPostsData, category }: Props) => {
  const [updateBlogCategory, { isSuccess, error }] = useUpdateBlogCategoryMutation();
  const [deleteBlogCategory] = useDeleteBlogCategoryMutation();
  const { name: cardName } = category;

  const [isUpdate, setIsUpdate] = useState(false);

  //이전 카테고리 이름이 잠시 노출되는 이슈 해결차 생성
  const [categoryName, setCategoryName] = useState({ name: cardName });

  const [isModalOpen, setModalOpen] = useState(false);

  //카테고리별 포스트
  const postsByCategoryName = useMemo(() => {
    const postsData = blogPostsData?.posts?.filter((post) => post.category === categoryName.name);
    return postsData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPostsData?.posts]);

  //Save category name
  const onClickSave = useCallback(
    async (cardName, currName) => {
      if (cardName === currName) return setIsUpdate(false);
      await updateBlogCategory({
        categoryName: { ...categoryName, name: cardName, currName },
        token: userData?.access_token,
      });

      setCategoryName({ name: currName });
    },
    [categoryName, updateBlogCategory, userData?.access_token],
  );

  //제목을 바꿀수 있는 경우만 save 되게 함
  useEffect(() => {
    if (isSuccess) setIsUpdate(false);
  }, [isSuccess]);

  //Delete category
  const onClickDelete = useCallback(
    (cardName: string, isCallback?: boolean) => {
      if (!isCallback) return setModalOpen(true);

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
      postsByCategoryName={postsByCategoryName}
      isUpdate={isUpdate}
      error={error}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      onClickSave={onClickSave}
      onChangeCategoryNameInput={onChangeCategoryNameInput}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
    />
  );
};

export default BlogCategoryCardContainer;
