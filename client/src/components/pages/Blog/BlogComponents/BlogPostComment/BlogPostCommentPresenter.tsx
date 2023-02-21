import { DIV, SECTION } from './BlogPostCommentStyle';
import { BlogComment } from '@app/services/blog/commentApi';
import BlogPostCommentTemplate from '../BlogPostCommentTemplate';
import { useState, useCallback } from 'react';

interface Props {
  postId?: string;
  comment: BlogComment;
}

const BlogPostCommentPresenter = ({ postId, comment }: Props) => {
  const { replies } = comment;

  const [isOpenReplies, setOpenReplies] = useState(false);

  const onClickReplies = useCallback(() => {
    setOpenReplies((prev) => !prev);
  }, []);

  return (
    <SECTION.Layout>
      <BlogPostCommentTemplate
        postId={postId}
        comment={comment}
        isOpenReplies={isOpenReplies}
        setOpenReplies={setOpenReplies}
        onClickReplies={onClickReplies}
      />

      {isOpenReplies &&
        replies.map((reply) => (
          <DIV.ReplyGourp key={reply._id}>
            <BlogPostCommentTemplate postId={postId} comment={comment} reply={reply} />
          </DIV.ReplyGourp>
        ))}
    </SECTION.Layout>
  );
};

export default BlogPostCommentPresenter;
