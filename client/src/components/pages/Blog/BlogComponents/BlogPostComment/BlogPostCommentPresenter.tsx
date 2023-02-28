import { DIV, SECTION } from './BlogPostCommentStyle';
import { BlogComment } from '@app/services/blog/commentApi';
import BlogPostCommentTemplate from '../BlogPostCommentTemplate';
import { useState, useCallback } from 'react';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData?: UserResponse;
  postId?: string;
  comment: BlogComment;
  userMatch: boolean;
}

const BlogPostCommentPresenter = ({ userData, postId, comment, userMatch }: Props) => {
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
        userMatch={userMatch}
        isOpenReplies={isOpenReplies}
        setOpenReplies={setOpenReplies}
        onClickReplies={onClickReplies}
      />

      {isOpenReplies &&
        replies.map((reply) => (
          <DIV.ReplyGourp key={reply._id}>
            <BlogPostCommentTemplate postId={postId} userData={userData} comment={comment} reply={reply} />
          </DIV.ReplyGourp>
        ))}
    </SECTION.Layout>
  );
};

export default BlogPostCommentPresenter;
