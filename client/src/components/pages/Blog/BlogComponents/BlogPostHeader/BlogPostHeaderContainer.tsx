import BlogPostHeaderPresenter from './BlogPostHeaderPresenter';
import { BlogPost } from '@app/services/blog/postApi';

interface Props {
  blogPost?: BlogPost;
}
const BlogPostHeaderContainer = ({ blogPost }: Props) => {
  return <BlogPostHeaderPresenter blogPost={blogPost} />;
};

export default BlogPostHeaderContainer;
