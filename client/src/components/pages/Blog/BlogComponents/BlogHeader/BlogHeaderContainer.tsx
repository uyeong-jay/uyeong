import { useAppDispatch } from '@app/hooks';
import { useGetBlogPostsBySearchQuery } from '@app/services/blog/postApi';
import { getPostsBySearch } from '@pages/Blog/BlogSlice';
import { useCallback, useEffect, useState } from 'react';
import BlogHeaderPresenter from './BlogHeaderPresenter';

const BlogHeaderContainer = () => {
  const [search, setSearch] = useState('');
  const { data: blogPostsDataBySearch } = useGetBlogPostsBySearchQuery(search);
  const dispatch = useAppDispatch();

  //포스트 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getPostsBySearch(blogPostsDataBySearch));
    }, 800);

    return () => clearTimeout(timer);
  }, [blogPostsDataBySearch, dispatch, search]);

  //포스트 검색어 입력
  const onChangeInput = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return <BlogHeaderPresenter search={search} onChangeInput={onChangeInput} />;
};

export default BlogHeaderContainer;
