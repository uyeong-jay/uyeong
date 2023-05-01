import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import HomePresenter from './HomePresenter';

const HomeContainer = () => {
  const { data: blogPostsData } = useGetBlogPostsQuery();

  return (
    <>
      <HomePresenter blogPostsData={blogPostsData} />
    </>
  );
};

export default HomeContainer;
