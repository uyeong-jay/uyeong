import React, { useCallback, useMemo, useState } from 'react';
import BlogCategoryPresenter from './BlogCategoryPresenter';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useGetBlogCategoriesQuery } from '@app/services/blog/categoryApi';
import { useGetBlogPostsQuery } from '@app/services/blog/postApi';

const BlogCategoryContainer = () => {
  const { data: userData } = useGetUserDataQuery();
  const { data: blogPostsData } = useGetBlogPostsQuery();

  //Paging Category
  const [categoryPageNum, setCategoryPageNum] = useState(1);
  const { data: blogCategoryData, isLoading: isLoadingCategories /*, isSuccess, error */ } =
    useGetBlogCategoriesQuery(categoryPageNum);
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const visiblePageCount = 5;
  const totalPageCount = blogCategoryData?.totalPages as number;
  const pageRemainder = totalPageCount % visiblePageCount;

  const categoryPages = useMemo(() => {
    const categoryPagesArr = Array.from({ length: totalPageCount }, (_, index) => index + 1).slice(
      currPageIndex,
      currPageIndex + visiblePageCount,
    );
    return categoryPagesArr;
  }, [totalPageCount, currPageIndex]);

  const onClickPageNum = useCallback((pageNum) => {
    setCategoryPageNum(pageNum);
  }, []);

  const onClickFirstPage = useCallback(() => {
    if (categoryPageNum <= 1) return;
    setCurrPageIndex(0);
    setCategoryPageNum(1);
  }, [categoryPageNum]);

  const onClickLastPage = useCallback(() => {
    if (categoryPageNum >= totalPageCount) return;
    setCurrPageIndex(totalPageCount - (pageRemainder > 0 ? pageRemainder : visiblePageCount));
    setCategoryPageNum(totalPageCount);
  }, [categoryPageNum, pageRemainder, totalPageCount]);

  const onClickPrevFirstPage = useCallback(() => {
    if (categoryPages[0] <= 1) return;
    setCurrPageIndex(currPageIndex - visiblePageCount);
    setCategoryPageNum(currPageIndex + 1 - visiblePageCount);
  }, [categoryPages, currPageIndex]);

  const onClickNextFirstPage = useCallback(() => {
    if (categoryPages[categoryPages.length - 1] >= totalPageCount) return;
    setCurrPageIndex(currPageIndex + visiblePageCount);
    setCategoryPageNum(currPageIndex + 1 + visiblePageCount);
  }, [categoryPages, totalPageCount, currPageIndex]);

  return (
    <BlogCategoryPresenter
      userData={userData}
      blogPostsData={blogPostsData}
      blogCategoryData={blogCategoryData}
      categoryPages={categoryPages}
      categoryPageNum={categoryPageNum}
      totalPageCount={totalPageCount}
      onClickPageNum={onClickPageNum}
      onClickFirstPage={onClickFirstPage}
      onClickLastPage={onClickLastPage}
      onClickPrevFirstPage={onClickPrevFirstPage}
      onClickNextFirstPage={onClickNextFirstPage}
      isLoadingCategories={isLoadingCategories}
    />
  );
};

export default BlogCategoryContainer;
