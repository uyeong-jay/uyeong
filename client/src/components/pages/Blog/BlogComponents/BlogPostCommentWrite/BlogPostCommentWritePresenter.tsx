import { BlogCommentReq } from '@app/services/blog/commentApi';
import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { BTN, DIV, FORM } from './BlogPostCommentWriteStyle';

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  blogCommentInfo: BlogCommentReq;
  writeReply?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickReply: () => void;
  onClickCancel: () => void;
}

const BlogPostCommentWritePresenter = ({
  textareaRef,
  blogCommentInfo,
  writeReply,
  onSubmit,
  onChangeComment,
  onClickReply,
  onClickCancel,
}: Props) => {
  return (
    <FORM.CommentWriteForm onSubmit={onSubmit}>
      {/* 효과 넣기 */}
      <textarea
        value={blogCommentInfo.content}
        onChange={onChangeComment}
        placeholder="Add a comment..."
        ref={textareaRef}
      ></textarea>

      {writeReply ? (
        <DIV.ReplyBtnGroup>
          <BTN.ReplyBtn type="button" onClick={onClickReply}>
            Reply
          </BTN.ReplyBtn>
          <BTN.CancelBtn type="button" onClick={onClickCancel}>
            Cancel
          </BTN.CancelBtn>
        </DIV.ReplyBtnGroup>
      ) : (
        <BTN.CommentBtn type="submit">Comment</BTN.CommentBtn>
      )}
    </FORM.CommentWriteForm>
  );
};

export default BlogPostCommentWritePresenter;
