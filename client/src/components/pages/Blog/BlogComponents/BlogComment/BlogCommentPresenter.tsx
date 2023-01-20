import React, { ChangeEvent } from 'react';
import { StyledBlogComment } from './BlogCommentStyle';

interface Props {
  blogComment: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BlogCommentPresenter = ({ blogComment, onChangeInput }: Props) => {
  return (
    <StyledBlogComment>
      <div>ㅁ 개의 댓글</div>
      <input type="text" value={blogComment} onChange={onChangeInput} placeholder="Write a comment"></input>
    </StyledBlogComment>
  );
};

export default BlogCommentPresenter;
