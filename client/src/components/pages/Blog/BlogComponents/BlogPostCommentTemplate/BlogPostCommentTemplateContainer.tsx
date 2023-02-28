import { BlogComment, BlogReply } from '@app/services/blog/commentApi';
import { UserResponse } from '@app/services/user/userApi';
import { useCallback, useState } from 'react';
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
  const [editComment, setEditComment] = useState(false);
  const [writeReply, setWriteReply] = useState(false);

  const [taggedNickname, setTaggedNickname] = useState('');
  const [regexTaggedNickname, setRegexTaggedNickname] = useState('');

  //이름 저장시 잠시 이전 이름이 노출되는 이슈 해결차 추가
  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // 태그가 된상태에서 수정을 눌렀을때 html코드 를 다시 @닉네임 으로 변경하기
  const onClickReply = useCallback(() => {
    setWriteReply(true);
    if (reply && reply.user.nickname !== userData?.user?.nickname) {
      setTaggedNickname(reply.user.nickname);
    }
  }, [reply, userData?.user?.nickname]);

  const onClickUpdate = useCallback(() => {
    setEditComment(true);
    const regex = /<span style="background-color: pink; color:red;">(.*?)<\/span>/;
    const matches = regex.exec(reply?.content as string);
    const result = matches?.[1];
    setRegexTaggedNickname(result as string);
  }, [reply?.content]);

  const onClickDelete = () => {
    console.log('a');
  };

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
      onClickReply={onClickReply}
      onClickReplies={onClickReplies}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
    />
  );
};

export default BlogPostCommentTemplateContainer;
