import HomePresenter from './HomePresenter';
import { useEffect } from 'react';
import { useAppDispatch } from '@app/hooks';
import { getTagName } from '@pages/Blog/BlogSlice';
import { useGetBlogPostsQuery } from '@app/services/blog/postApi';

const HomeContainer = () => {
  const { data: blogPostsData } = useGetBlogPostsQuery({ limit: 5 });
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
