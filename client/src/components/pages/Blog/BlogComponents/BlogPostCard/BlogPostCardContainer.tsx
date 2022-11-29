import { BlogPostsProps } from '@_types/types-blog';
import BlogPostCardPresenter from './BlogPostCardPresenter';

interface Props {
  post: BlogPostsProps;
}

const BlogPostCardContainer = ({ post }: Props) => {
  return <BlogPostCardPresenter post={post} />;
};

export default BlogPostCardContainer;
