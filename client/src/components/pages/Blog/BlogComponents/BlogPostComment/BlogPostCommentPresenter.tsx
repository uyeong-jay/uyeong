import { BlogCommenReq, BlogCommentRes } from '@app/services/blog/commentApi';
import React, { ChangeEvent, FormEvent, useCallback, useRef } from 'react';
import { StyledBlogPostComment } from './BlogPostCommentStyle';

interface Props {
  blogCommentInfo: BlogCommenReq;
  blogCommentsData?: BlogCommentRes;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const BlogPostCommentPresenter = ({ blogCommentInfo, blogCommentsData, onSubmit, onChangeInput }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = useCallback(() => {
    const textareaEl = textareaRef.current;
    if (textareaEl !== null) {
      textareaEl.style.height = '150px';
      // console.log(textareaEl.scrollHeight);
      textareaEl.style.height = textareaEl.scrollHeight + 2 + 'px';
    }
  }, []);

  console.log('1', blogCommentsData);

  return (
    <StyledBlogPostComment>
      <div>ㅁ 개의 댓글</div>
      <form onSubmit={onSubmit}>
        <textarea
          value={blogCommentInfo.content}
          onChange={(e) => {
            resizeHeight();
            onChangeInput(e);
          }}
          placeholder="Write a comment"
          ref={textareaRef}
          rows={1}
        ></textarea>
        <button type="submit">Respond</button>
      </form>
    </StyledBlogPostComment>
  );
};

export default BlogPostCommentPresenter;
