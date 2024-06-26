import { BlogCommentReq } from '@app/services/blog/commentApi';
import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { BTN, DIV, FORM } from './BlogPostCommentWriteStyle';
import useAnimation from '@hooks/useAnimation';
import Link from 'next/link';
import Modal from '@modals/Modal';

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  isNotLoggedIn: boolean;
  blogCommentInfo: BlogCommentReq;
  writeReply?: boolean;
  editComment?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickReply: () => void;
  onClickReplyCancel: () => void;
  onClickEditCancel: () => void;
  onClickEditSave: () => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  createCommentError: any;
  createReplyError: any;
  updateCommentError: any;
}

const BlogPostCommentWritePresenter = ({
  textareaRef,
  isNotLoggedIn,
  blogCommentInfo,
  writeReply,
  editComment,
  onSubmit,
  onChangeComment,
  onClickReply,
  onClickReplyCancel,
  onClickEditCancel,
  onClickEditSave,
  isModalOpen,
  setModalOpen,
  createCommentError,
  createReplyError,
  updateCommentError,
}: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isNotLoggedIn);

  return (
    <>
      <FORM.CommentWriteForm onSubmit={onSubmit} isNotLoggedIn={isNotLoggedIn}>
        <div>
          <textarea
            ref={textareaRef}
            value={blogCommentInfo.content}
            onChange={onChangeComment}
            placeholder="Add a comment..."
            spellCheck="false"
          />
          {render && (
            <DIV.CommentLoginBox animationName={show && 'up'} onAnimationEnd={() => onAnimationEnd}>
              Please log in first !<Link href="/login">Log in</Link>
            </DIV.CommentLoginBox>
          )}
        </div>

        {writeReply ? (
          <DIV.ReplyBtnGroup>
            <BTN.ReplyCancelBtn type="button" onClick={onClickReplyCancel}>
              Cancel
            </BTN.ReplyCancelBtn>
            <BTN.ReplyBtn type="button" onClick={onClickReply}>
              Reply
            </BTN.ReplyBtn>
          </DIV.ReplyBtnGroup>
        ) : editComment ? (
          <DIV.EditBtnGroup>
            <BTN.EditCancelBtn type="button" onClick={onClickEditCancel}>
              Cancel
            </BTN.EditCancelBtn>
            <BTN.EditSaveBtn type="button" onClick={onClickEditSave}>
              Save
            </BTN.EditSaveBtn>
          </DIV.EditBtnGroup>
        ) : (
          <BTN.CommentBtn type="submit">Comment</BTN.CommentBtn>
        )}
      </FORM.CommentWriteForm>

      {(createCommentError || createReplyError || updateCommentError) && (
        <Modal
          type="alert"
          msg={createCommentError?.data?.msg || createReplyError?.data?.msg || updateCommentError?.data?.msg}
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          shakeAlert
        />
      )}
    </>
  );
};

export default BlogPostCommentWritePresenter;
