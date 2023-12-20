import { BlogCommentRes } from '@app/services/blog/commentApi';
import { DIV, SECTION } from './BlogPostFooterStyle';
import BlogPostComment from '../BlogPostComment';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import { memo } from 'react';

interface Props {
  postId?: string;
  blogCommentsData?: BlogCommentRes;
}

const BlogPostFooterPresenter = ({ postId, blogCommentsData }: Props) => {
  return (
    <SECTION.Frame>
      <DIV.CommentWriteBlock>
        <div>{blogCommentsData?.totalCommentCount} Comments</div>
        <BlogPostCommentWrite postId={postId} />
      </DIV.CommentWriteBlock>

      <DIV.CommentMdViewerGroup>
        {blogCommentsData?.comments?.map((comment) => (
          <BlogPostComment key={comment._id} postId={postId} comment={comment} />
        ))}
      </DIV.CommentMdViewerGroup>
    </SECTION.Frame>
  );
};

export default memo(BlogPostFooterPresenter);
