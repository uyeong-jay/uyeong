import { BlogCommentRes } from '@app/services/blog/commentApi';
import { DIV, SECTION } from './BlogPostFooterStyle';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import BlogPostComments from '../BlogPostComments';
import { RefObject } from 'react';
import MiniLoader from '@modals/MiniLoader';

interface Props {
  postId?: string;
  blogCommentsData?: BlogCommentRes;
  targetRef: RefObject<HTMLDivElement>;
  isLoadingComments: boolean;
  isFetchingComments: boolean;
  hasNoMoreComments: number | boolean | undefined;
  hasNoComment: boolean;
}

const BlogPostFooterPresenter = ({
  postId,
  blogCommentsData,
  targetRef,
  isLoadingComments,
  isFetchingComments,
  hasNoMoreComments,
  hasNoComment,
}: Props) => {
  const currCommentCount = blogCommentsData?.comments?.length;
  const totalCommentCount = blogCommentsData?.totalCommentCount;
  return (
    <SECTION.Frame>
      <DIV.CommentWriteBlock>
        <div>
          {totalCommentCount ?? 0} {(totalCommentCount as number) > 1 ? ` Comments` : ` Comment`}
        </div>
        <BlogPostCommentWrite postId={postId} />
      </DIV.CommentWriteBlock>

      <BlogPostComments blogCommentsData={blogCommentsData} postId={postId} />

      <DIV.IntersectionTarget id="comments_intersection_target" ref={targetRef}>
        {isLoadingComments || isFetchingComments ? (
          <MiniLoader w="35px" h="35px" />
        ) : !currCommentCount && hasNoComment ? (
          <DIV.UnderComments>- No comment yet -</DIV.UnderComments>
        ) : hasNoMoreComments ? (
          <DIV.UnderComments>{!currCommentCount ? `- No comment yet -` : `- No more comments -`}</DIV.UnderComments>
        ) : (
          <></>
        )}
      </DIV.IntersectionTarget>
    </SECTION.Frame>
  );
};

export default BlogPostFooterPresenter;
