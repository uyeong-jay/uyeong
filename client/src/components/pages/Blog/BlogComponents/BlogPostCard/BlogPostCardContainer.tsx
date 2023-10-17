import { BlogPost } from '@app/services/blog/postApi';
import BlogPostCardPresenter from './BlogPostCardPresenter';

interface Props {
  post: BlogPost;
}

const BlogPostCardContainer = ({ post }: Props) => {
  return <BlogPostCardPresenter post={post} />;
};

export default BlogPostCardContainer;
