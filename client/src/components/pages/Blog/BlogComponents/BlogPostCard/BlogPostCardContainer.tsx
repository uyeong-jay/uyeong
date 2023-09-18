import { BlogPost } from '@app/services/blog/postApi';
import BlogPostCardPresenter from './BlogPostCardPresenter';
// import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';

interface Props {
  post: BlogPost;
}

const BlogPostCardContainer = ({ post }: Props) => {
  // const { data: blogCommentsData } = useGetBlogCommentsQuery(titleForUrl);

  return <BlogPostCardPresenter post={post} /* blogCommentsData={blogCommentsData} */ />;
};

export default BlogPostCardContainer;
