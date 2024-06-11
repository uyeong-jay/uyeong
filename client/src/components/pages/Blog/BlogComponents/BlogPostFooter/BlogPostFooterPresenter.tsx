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
          <MiniLoader w={30} responsive />
        ) : !currCommentCount && hasNoComment ? (
          <DIV.TargetMsg>- No comment yet -</DIV.TargetMsg>
        ) : hasNoMoreComments ? (
          <DIV.TargetMsg>{!currCommentCount ? `- No comment yet -` : `- No more comments -`}</DIV.TargetMsg>
        ) : (
          <></>
        )}
      </DIV.IntersectionTarget>
    </SECTION.Frame>
  );
};

export default BlogPostFooterPresenter;
