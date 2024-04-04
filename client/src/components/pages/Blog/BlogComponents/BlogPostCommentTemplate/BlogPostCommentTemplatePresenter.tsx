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
import useOnClickOutside from '@hooks/useOnClickOutside';
import { useCallback, useRef, useState } from 'react';
import EllipsisVerticalIcon from '@icons/EllipsisVerticalIcon';
import EditIcon from '@icons/EditIcon';
import TrashIcon from '@icons/TrashIcon';
import UserIcon from '@icons/UserIcon';

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
  onClickEdit: () => void;
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
  onClickEdit,
  onClickDelete,
}: Props) => {
  const { user, content, replies, createdAt } = comment;

  const dropdownBoxRef = useRef(null);
  const [isCommentMenuOpen, setCommentMenuOpen] = useState(false);

  const onClickCommentMenu = useCallback(() => {
    setCommentMenuOpen((prev) => !prev);
  }, []);

  const onClickOutside = useCallback(() => {
    setCommentMenuOpen(false);
  }, []);

  useOnClickOutside(dropdownBoxRef, onClickOutside);

  return (
    <SECTION.Frame>
      {/* 프로필 이미지 */}
      <DIV.CommentTop>
        <div className="comment-user-avatar-warpper comment-user-avatar">
          {reply?.user.avatar || user.avatar ? (
            <Image
              className="comment-user-avatar"
              src={reply ? reply.user.avatar : user.avatar}
              alt="user-avatar"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <>
              <UserIcon />
            </>
          )}
        </div>
        <DIV.CommentTopRight>
          <DIV.CommentInfo>
            <P.Nickname>{reply ? reply.user.nickname : user.nickname}</P.Nickname>
            <span>·</span>
            <P.CreatedDate>{reply ? formatDate(reply.createdAt) : formatDate(createdAt)}</P.CreatedDate>
          </DIV.CommentInfo>

          {(userMatch || (reply && userData?.user?._id === reply?.user._id) || userData?.user?.role === 'admin') && (
            <DIV.CommentMenu ref={dropdownBoxRef} onClick={onClickCommentMenu}>
              <EllipsisVerticalIcon />
              {isCommentMenuOpen && (
                <DIV.CommentMenuBtns>
                  <BTN.CommentEditBtn onClick={onClickEdit}>
                    <EditIcon />
                    Edit
                  </BTN.CommentEditBtn>
                  <BTN.CommentDeleteBtn onClick={() => onClickDelete()}>
                    <TrashIcon />
                    Delete
                  </BTN.CommentDeleteBtn>
                </DIV.CommentMenuBtns>
              )}
            </DIV.CommentMenu>
          )}
        </DIV.CommentTopRight>
      </DIV.CommentTop>

      <DIV.CommentMain>
        <DIV.CommentMainContent>
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
        </DIV.CommentMainContent>

        <DIV.CommentMainReply>
          {!reply &&
            (replies.length > 0 ? (
              <>
                <P.Replies onClick={onClickReplies}>
                  {isOpenReplies ? <CaretUpIcon /> : <CaretDownIcon />}{' '}
                  {replies.length > 1 ? `${replies.length} replies` : `${replies.length} reply`}
                </P.Replies>
                <span>·</span>
              </>
            ) : (
              <></>
            ))}

          <BTN.CommentReplyBtn onClick={onClickReply} writeReply={writeReply}>
            Reply
          </BTN.CommentReplyBtn>
        </DIV.CommentMainReply>

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
      </DIV.CommentMain>
      <Modal
        type="delete"
        msg={`Are you sure you want to delete this ${reply ? `reply` : `comment`}?`}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDelete(true)}
        shakeAlert
      />
    </SECTION.Frame>
  );
};

export default BlogPostCommentTemplatePresenter;
