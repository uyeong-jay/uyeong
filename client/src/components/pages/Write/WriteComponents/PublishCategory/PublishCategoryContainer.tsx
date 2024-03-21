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

  const onClickChooseCtegory = useCallback(() => {
    setOpenedCategory((prev) => !prev);
  }, []);

  const onClickCategory = useCallback(
    (e) => {
      //똑같은거 한번더 클릭하면 다시 '' 로 대체
      const clickedCategory = e.target.getAttribute('value');
      if (blogPostInfo.category === clickedCategory) setBlogPostInfo({ ...blogPostInfo, category: '' });
      else setBlogPostInfo({ ...blogPostInfo, category: clickedCategory });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  return (
    <PublishCategoryPresenter
      blogCategoryData={blogCategoryData}
      blogPostInfo={blogPostInfo}
      isOpenedCategory={isOpenedCategory}
      onClickChooseCtegory={onClickChooseCtegory}
      onClickCategory={onClickCategory}
    />
  );
};

export default PublishCategoryContainer;
