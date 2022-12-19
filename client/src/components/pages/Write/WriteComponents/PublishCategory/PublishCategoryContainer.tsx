import { useGetBlogCategoriesQuery } from '@app/services/blog/blogCategoryApi';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import React, { useCallback, useState } from 'react';
import PublishCategoryPresenter from './PublishCategoryPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const PublishCategoryContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const { data: blogCategoryData } = useGetBlogCategoriesQuery();

  const [isOpenedCtegory, setOpenedCtegory] = useState(false);

  const onClickChooseCtegory = useCallback(() => {
    setOpenedCtegory(true);
  }, []);

  const onClickCancel = useCallback(() => {
    setOpenedCtegory(false);
  }, []);

  const onClickDone = useCallback(() => {
    setOpenedCtegory(false);
  }, []);

  const onClickCategory = useCallback(
    (e) => {
      setBlogPostInfo({ ...blogPostInfo, category: e.target.getAttribute('value') });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return (
    <PublishCategoryPresenter
      blogCategoryData={blogCategoryData}
      isOpenedCtegory={isOpenedCtegory}
      onClickChooseCtegory={onClickChooseCtegory}
      onClickCancel={onClickCancel}
      onClickDone={onClickDone}
      onClickCategory={onClickCategory}
    />
  );
};

export default PublishCategoryContainer;
