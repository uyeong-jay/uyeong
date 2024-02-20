import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import HomePresenter from './HomePresenter';
import { useEffect } from 'react';
import { useAppDispatch } from '@app/hooks';
import { getTagName } from '@pages/Blog/BlogSlice';

const HomeContainer = () => {
  const { data: blogPostsData } = useGetBlogPostsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTagName(''));
  }, [dispatch]);

  return (
    <>
      <HomePresenter blogPostsData={blogPostsData} />
    </>
  );
};

export default HomeContainer;
