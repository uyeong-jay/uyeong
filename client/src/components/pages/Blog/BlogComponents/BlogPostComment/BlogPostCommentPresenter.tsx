import { BlogCommenReq, BlogCommentRes } from '@app/services/blog/commentApi';
import MarkdownViewer from '@organisms/MarkdownViewer';
import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { StyledBlogPostComment } from './BlogPostCommentStyle';

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  blogCommentInfo: BlogCommenReq;
  blogCommentsData?: BlogCommentRes;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const BlogPostCommentPresenter = ({
  textareaRef,
  blogCommentInfo,
  blogCommentsData,
  onSubmit,
  onChangeComment,
}: Props) => {
  return (
    <StyledBlogPostComment>
      <div>
        <button>Common</button>
        <button>Issue</button>
      </div>
      <div>ㅁ 개의 댓글</div>
      <form onSubmit={onSubmit}>
        <textarea
          value={blogCommentInfo.content}
          onChange={onChangeComment}
          placeholder="Write a comment"
          ref={textareaRef}
        ></textarea>
        <button type="submit">Respond</button>
      </form>

      <div className="blog-comment-MDviewer-group">
        {blogCommentsData?.comments.map((comment) => (
          <div className="blog-comment-MDviewer" key={comment._id}>
            <MarkdownViewer content={comment.content} />
          </div>
        ))}
      </div>
    </StyledBlogPostComment>
  );
};

export default BlogPostCommentPresenter;
