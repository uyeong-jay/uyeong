import { BlogCommentRes } from '@app/services/blog/commentApi';
import { DIV, SECTION } from './BlogPostFooterStyle';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import BlogPostComments from '../BlogPostComments';

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

      <BlogPostComments blogCommentsData={blogCommentsData} postId={postId} />
    </SECTION.Frame>
  );
};

export default BlogPostFooterPresenter;
