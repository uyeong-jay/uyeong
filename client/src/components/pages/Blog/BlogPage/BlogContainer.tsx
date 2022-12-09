import BlogPresenter from './BlogPresenter';
import { BlogProps } from '@_types/types-blog';

const BlogContainer = ({ posts }: BlogProps) => {
  return <BlogPresenter posts={posts} />;
};

export default BlogContainer;
