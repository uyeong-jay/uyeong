import MarkdownViewer from '@organisms/MarkdownViewer';
import { SECTION, DIV, P, BTN } from './BlogPostCommentTemplateStyle';
import Image from 'next/image';
import { BlogComment, BlogReply } from '@app/services/blog/commentApi';
import formatDate from '@utils/formatDate';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@modals/Modal';

interface Props {
  postId?: string;
  comment: BlogComment;
  reply?: BlogReply;
  userData?: UserResponse;
  userMatch?: boolean;
  taggedNickname: string;
  regexTaggedNickname: string;
  writeReply: boolean;
  setWriteReply: (writeReply: boolean) => void;
  editComment: boolean;
  setEditComment: (editComment: boolean) => void;
  isOpenReplies?: boolean;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  commentContent: string;
  setCommentContent: (commentContent: string) => void;
  replyContent: string;
  setReplyContent: (replyContent: string) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onClickReply: () => void;
  onClickReplies?: () => void;
  onClickUpdate: () => void;
  onClickDelete: (isCallback?: boolean) => void;
}

const BlogPostCommentTemplatePresenter = ({
  postId,
  userData,
  comment,
  reply,
  userMatch,
  taggedNickname,
  regexTaggedNickname,
  writeReply,
  setWriteReply,
  editComment,
  setEditComment,
  isOpenReplies,
  setOpenReplies,
  commentContent,
  setCommentContent,
  replyContent,
  setReplyContent,
  isModalOpen,
  setModalOpen,
  onClickReply,
  onClickReplies,
  onClickUpdate,
  onClickDelete,
}: Props) => {
  const { user, content, replies, createdAt } = comment;

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

          {(userMatch || (reply && userData?.user?._id === reply?.user._id) || userData?.user?.role === 'admin') && (
            <DIV.CommentSideBtnGroup>
              {!editComment && <BTN.CommentUpdateBtn onClick={onClickUpdate}>수정</BTN.CommentUpdateBtn>}
              <BTN.CommentDeleteBtn onClick={() => onClickDelete()}>삭제</BTN.CommentDeleteBtn>
            </DIV.CommentSideBtnGroup>
          )}
        </DIV.RightTop>

        <DIV.RightMiddle>
          {!editComment ? (
            <MarkdownViewer
              content={
                //이름 저장시 잠시 이전 이름이 노출되는 이슈 해결차 추가
                // client data: replyContent, commentContent
                // server data: reply.content, content
                reply ? (replyContent ? replyContent : reply.content) : commentContent ? commentContent : content
              }
            />
          ) : (
            <BlogPostCommentWrite
              comment={comment}
              reply={reply}
              regexTaggedNickname={regexTaggedNickname}
              editComment={editComment}
              setEditComment={setEditComment}
              setCommentContent={setCommentContent}
              setReplyContent={setReplyContent}
            />
          )}
        </DIV.RightMiddle>

        <DIV.RightBottom>
          {!reply && (
            <P.Replies onClick={onClickReplies}>
              {isOpenReplies ? <CaretUpIcon /> : <CaretDownIcon />} {replies.length} replies
            </P.Replies>
          )}

          <BTN.CommentReplyBtn onClick={onClickReply}>Reply</BTN.CommentReplyBtn>
        </DIV.RightBottom>
        {writeReply && (
          <BlogPostCommentWrite
            postId={postId}
            comment={comment}
            taggedNickname={taggedNickname}
            writeReply={writeReply}
            setWriteReply={setWriteReply}
            setOpenReplies={setOpenReplies}
          />
        )}
      </DIV.Right>
      <Modal
        type="delete"
        msg="Are you sure you want to delete the comment?"
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDelete(true)}
      />
    </SECTION.Layout>
  );
};

export default BlogPostCommentTemplatePresenter;
