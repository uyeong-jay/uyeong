import { BlogComment } from '@app/services/blog/commentApi';
import BlogPostCommentPresenter from './BlogPostCommentPresenter';

interface Props {
  postId?: string;
  comment: BlogComment;
}

const BlogPostCommentContainer = ({ postId, comment }: Props) => {
  return <BlogPostCommentPresenter postId={postId} comment={comment} />;
};

export default BlogPostCommentContainer;
