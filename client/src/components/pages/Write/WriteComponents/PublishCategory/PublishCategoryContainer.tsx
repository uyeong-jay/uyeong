import { useGetBlogCategoriesQuery } from '@app/services/blog/categoryApi';
import { BlogPostReq } from '@app/services/blog/postApi';
import React, { useCallback, useState } from 'react';
import PublishCategoryPresenter from './PublishCategoryPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishCategoryContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const { data: blogCategoryData } = useGetBlogCategoriesQuery();

  const [isOpenedCategory, setOpenedCategory] = useState(false);
  const [isClickedCategory, setClickedCategory] = useState(false);

  const onClickChooseCtegory = useCallback(() => {
    setOpenedCategory(true);
  }, []);

  const onClickCancel = useCallback(() => {
    setBlogPostInfo({ ...blogPostInfo, category: '' });
    setOpenedCategory(false);
    setClickedCategory(false);
  }, [blogPostInfo, setBlogPostInfo]);

  const onClickDone = useCallback(() => {
    if (isClickedCategory) setOpenedCategory(false);
    return;
  }, [isClickedCategory]);

  const onClickCategory = useCallback(
    (e) => {
      setBlogPostInfo({ ...blogPostInfo, category: e.target.getAttribute('value') });
      setClickedCategory(true);
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return (
    <PublishCategoryPresenter
      blogCategoryData={blogCategoryData}
      blogPostInfo={blogPostInfo}
      isOpenedCategory={isOpenedCategory}
      isClickedCategory={isClickedCategory}
      onClickChooseCtegory={onClickChooseCtegory}
      onClickCancel={onClickCancel}
      onClickDone={onClickDone}
      onClickCategory={onClickCategory}
    />
  );
};

export default PublishCategoryContainer;
