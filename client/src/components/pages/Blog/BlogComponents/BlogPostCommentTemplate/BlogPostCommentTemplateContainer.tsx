import { BlogComment, BlogReply, useDeleteBlogCommentMutation } from '@app/services/blog/commentApi';
import { UserResponse } from '@app/services/user/userApi';
import { useCallback, useEffect, useState } from 'react';
import BlogPostCommentTemplatePresenter from './BlogPostCommentTemplatePresenter';

interface Props {
  postId?: string;
  userData?: UserResponse;
  comment: BlogComment;
  reply?: BlogReply;
  userMatch?: boolean;
  isOpenReplies?: boolean;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  onClickReplies?: () => void;
}

const BlogPostCommentTemplateContainer = ({
  postId,
  comment,
  reply,
  userData,
  userMatch,
  isOpenReplies,
  setOpenReplies,
  onClickReplies,
}: Props) => {
  const [deleteComment, { error: deleteCommentError }] = useDeleteBlogCommentMutation();

  const [editComment, setEditComment] = useState(false);
  const [writeReply, setWriteReply] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [taggedNickname, setTaggedNickname] = useState('');
  const [regexTaggedNickname, setRegexTaggedNickname] = useState('');

  //이름 수정시 잠시 이전 이름이 노출되는 이슈 해결차 추가
  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    if (deleteCommentError) {
      setModalOpen(true);
    }
  }, [deleteCommentError]);

  const onClickReply = useCallback(() => {
    setWriteReply(true);
    if (reply && reply.user.nickname !== userData?.user?.nickname) {
      setTaggedNickname(reply.user.nickname);
    }
  }, [reply, userData?.user?.nickname]);

  const onClickEdit = useCallback(() => {
    setEditComment(true);
    const regex = /\*\*@(.*?)\*\*/;
    const matches = regex.exec(reply?.content as string);
    const result = matches?.[1];

    setRegexTaggedNickname(result as string);
  }, [reply?.content]);

  const onClickDelete = useCallback(
    (isCallback?: boolean) => {
      if (!isCallback) return setModalOpen(true);

      const data = {
        commentInfo: {
          id: reply?.comment_id ? reply?._id : comment?._id, //댓글, 답글 삭제용
          comment_id: reply?.comment_id ? reply?.comment_id : '',
        },
        token: userData?.access_token,
      };
      deleteComment(data);
    },
    [comment?._id, deleteComment, reply?._id, reply?.comment_id, userData?.access_token],
  );

  return (
    <BlogPostCommentTemplatePresenter
      postId={postId}
      userData={userData}
      comment={comment}
      reply={reply}
      userMatch={userMatch}
      taggedNickname={taggedNickname}
      regexTaggedNickname={regexTaggedNickname}
      editComment={editComment}
      setEditComment={setEditComment}
      writeReply={writeReply}
      setWriteReply={setWriteReply}
      isOpenReplies={isOpenReplies}
      setOpenReplies={setOpenReplies}
      commentContent={commentContent}
      setCommentContent={setCommentContent}
      replyContent={replyContent}
      setReplyContent={setReplyContent}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onClickReply={onClickReply}
      onClickReplies={onClickReplies}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      deleteCommentError={deleteCommentError}
    />
  );
};

export default BlogPostCommentTemplateContainer;
