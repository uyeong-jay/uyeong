import { useGetBlogPostsQuery } from '@app/services/blog/postApi';
import BlogPresenter from './BlogPresenter';

const BlogContainer = () => {
  const { data: blogPostsData } = useGetBlogPostsQuery();

  console.log(blogPostsData);

  return <BlogPresenter />;
};

export default BlogContainer;
