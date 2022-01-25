import BlogPresenter from './BlogPresenter';
import { BlogProps } from '@_types/types-blog';

const BlogContainer = ({ posts, title, description }: BlogProps) => {
  return <BlogPresenter posts={posts} title={title} description={description} />;
};

export default BlogContainer;
