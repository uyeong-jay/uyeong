import { BlogCommentRes } from '@app/services/blog/commentApi';
import { BTN, DIV, SECTION } from './BlogPostCommentsStyle';
import BlogPostComment from '../BlogPostComment';
import BlogPostCommentWrite from '../BlogPostCommentWrite';

interface Props {
  postId?: string;
  blogCommentsData?: BlogCommentRes;
}

const BlogPostCommentsPresenter = ({ postId, blogCommentsData }: Props) => {
  return (
    <SECTION.Layout>
      <DIV.CommentTypeBtnGroup>
        <BTN.CommonCommentBtn>Common</BTN.CommonCommentBtn>
        <BTN.IssueCommentBtn>Issue</BTN.IssueCommentBtn>
      </DIV.CommentTypeBtnGroup>
      <DIV.CommonCommentBlock>
        {/* 댓글 개수 넣기 */}
        <div>ㅁ Comments</div>
        <BlogPostCommentWrite postId={postId} />
      </DIV.CommonCommentBlock>

      <DIV.CommentMDviewerGroup>
        {blogCommentsData?.comments?.map((comment) => (
          <BlogPostComment key={comment._id} postId={postId} comment={comment} />
        ))}
      </DIV.CommentMDviewerGroup>
    </SECTION.Layout>
  );
};

export default BlogPostCommentsPresenter;
