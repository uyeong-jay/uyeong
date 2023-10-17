import { BlogCommentRes } from '@app/services/blog/commentApi';
import { DIV, SECTION } from './BlogPostCommentsStyle';
import BlogPostComment from '../BlogPostComment';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import { memo } from 'react';

interface Props {
  postId?: string;
  blogCommentsData?: BlogCommentRes;
  commentCount?: number;
}

const BlogPostCommentsPresenter = ({ postId, blogCommentsData, commentCount }: Props) => {
  return (
    <SECTION.Frame>
      <DIV.CommonCommentBlock>
        {/* 댓글 개수 넣기 */}
        <div>{commentCount} Comments</div>
        <BlogPostCommentWrite postId={postId} />
      </DIV.CommonCommentBlock>

      <DIV.CommentMDviewerGroup>
        {blogCommentsData?.comments?.map((comment) => (
          <BlogPostComment key={comment._id} postId={postId} comment={comment} />
        ))}
      </DIV.CommentMDviewerGroup>
    </SECTION.Frame>
  );
};

export default memo(BlogPostCommentsPresenter);
