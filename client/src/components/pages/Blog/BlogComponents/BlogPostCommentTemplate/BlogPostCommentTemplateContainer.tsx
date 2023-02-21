import { BlogComment, BlogReply } from '@app/services/blog/commentApi';
import BlogPostCommentTemplatePresenter from './BlogPostCommentTemplatePresenter';

interface Props {
  postId?: string;
  comment: BlogComment;
  reply?: BlogReply;
  isOpenReplies?: boolean;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  onClickReplies?: () => void;
}

const BlogPostCommentTemplateContainer = ({
  postId,
  comment,
  reply,
  isOpenReplies,
  setOpenReplies,
  onClickReplies,
}: Props) => {
  return (
    <BlogPostCommentTemplatePresenter
      postId={postId}
      comment={comment}
      reply={reply}
      isOpenReplies={isOpenReplies}
      setOpenReplies={setOpenReplies}
      onClickReplies={onClickReplies}
    />
  );
};

export default BlogPostCommentTemplateContainer;
