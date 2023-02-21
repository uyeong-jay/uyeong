import MarkdownViewer from '@organisms/MarkdownViewer';
import { SECTION, DIV, P, BTN } from './BlogPostCommentTemplateStyle';
import Image from 'next/image';
import { BlogComment, BlogReply } from '@app/services/blog/commentApi';
import formatDate from '@utils/formatDate';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';
import { useCallback, useState } from 'react';
import BlogPostCommentWrite from '../BlogPostCommentWrite';

interface Props {
  postId?: string;
  comment: BlogComment;
  reply?: BlogReply;
  isOpenReplies?: boolean;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  onClickReplies?: () => void;
}

const BlogPostCommentTemplatePresenter = ({
  postId,
  comment,
  reply,
  isOpenReplies,
  setOpenReplies,
  onClickReplies,
}: Props) => {
  const { user, content, replies, createdAt } = comment;
  const [isOpenReply, setOpenReply] = useState(false);

  //- reply -
  // _id
  // post_id
  // comment_id
  // user
  // content
  // createdAt
  // updatedAt

  const onClickReply = useCallback(() => {
    setOpenReply(true);
  }, []);

  return (
    <SECTION.Layout>
      {/* 프로필 이미지 */}
      <DIV.Left>
        <div className="comment-user-avatar-warpper comment-user-avatar">
          <Image
            className="comment-user-avatar"
            src={reply ? reply.user.avatar : user.avatar}
            alt="user-avatar"
            width={50}
            height={50}
          />
        </div>
      </DIV.Left>

      <DIV.Right>
        <DIV.RightTop>
          <DIV.CommentInfo>
            <P.Nickname>{reply ? reply.user.nickname : user.nickname}</P.Nickname>
            <P.CreatedDate>{reply ? formatDate(reply.createdAt) : formatDate(createdAt)}</P.CreatedDate>
          </DIV.CommentInfo>

          <DIV.CommentSideBtnGroup>
            <BTN.CommentUpdateBtn>수정</BTN.CommentUpdateBtn>
            <BTN.CommentDeleteBtn>삭제</BTN.CommentDeleteBtn>
          </DIV.CommentSideBtnGroup>
        </DIV.RightTop>

        <DIV.RightMiddle>
          <MarkdownViewer content={reply ? reply.content : content} />
        </DIV.RightMiddle>

        <DIV.RightBottom>
          {!reply && (
            <P.Replies onClick={onClickReplies}>
              {isOpenReplies ? <CaretUpIcon /> : <CaretDownIcon />} {replies.length} replies
            </P.Replies>
          )}

          <BTN.CommentReplyBtn onClick={onClickReply}>Reply</BTN.CommentReplyBtn>
        </DIV.RightBottom>
        {isOpenReply && (
          <BlogPostCommentWrite
            postId={postId}
            comment={comment}
            isOpenReply={isOpenReply}
            setOpenReply={setOpenReply}
            setOpenReplies={setOpenReplies}
          />
        )}
      </DIV.Right>
    </SECTION.Layout>
  );
};

export default BlogPostCommentTemplatePresenter;
