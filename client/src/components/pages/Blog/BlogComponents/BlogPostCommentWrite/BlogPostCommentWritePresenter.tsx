import { BlogCommentReq } from '@app/services/blog/commentApi';
import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { BTN, DIV, FORM } from './BlogPostCommentWriteStyle';

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  blogCommentInfo: BlogCommentReq;
  writeReply?: boolean;
  editComment?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickReply: () => void;
  onClickReplyCancel: () => void;
  onClickEditCancel: () => void;
  onClickEditSave: () => void;
}

const BlogPostCommentWritePresenter = ({
  textareaRef,
  blogCommentInfo,
  writeReply,
  editComment,
  onSubmit,
  onChangeComment,
  onClickReply,
  onClickReplyCancel,
  onClickEditCancel,
  onClickEditSave,
}: Props) => {
  return (
    <FORM.CommentWriteForm onSubmit={onSubmit}>
      {/* 효과 넣기 */}
      <textarea
        value={blogCommentInfo.content}
        onChange={onChangeComment}
        placeholder="Add a comment..."
        ref={textareaRef}
        spellCheck="false" //문법 교정 빨간줄 없애기
      ></textarea>

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
  );
};

export default BlogPostCommentWritePresenter;
