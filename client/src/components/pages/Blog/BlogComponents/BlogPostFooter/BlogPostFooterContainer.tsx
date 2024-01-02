import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { useRouter } from 'next/router';
import BlogPostFooterPresenter from './BlogPostFooterPresenter';
import { memo, useEffect, useMemo, useState } from 'react';
import { useIntersect } from '@hooks/useIntersect';

interface Props {
  postId?: string;
}

const BlogPostFooterContainer = ({ postId }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const [isIntersectionEnded, setIntersectionEnded] = useState(false);

  const initialCommentPagingInfo = {
    postTitle,
    pageNum: 0,
  };
  const [commentPagingInfo, setCommentPagingInfo] = useState(initialCommentPagingInfo);
  const { data: blogCommentsData, isFetching: isFetchingComments } = useGetBlogCommentsQuery(commentPagingInfo);
  const { comments, totalCommentCount, commentCountToShow } = blogCommentsData || {};

  const [hasNoMoreComments, setNoMoreComments] = useState(false);
  const [hasNoComment, setNoComment] = useState(false);

  const currCommentPage = useMemo(() => {
    const noMoreComments = (comments?.length as number) >= (totalCommentCount as number);
    const moreCommentPage = (commentCountToShow as number) < (totalCommentCount as number);
    return { moreCommentPage, noMoreComments };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const [isLoadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (hasNoMoreComments && currCommentPage.moreCommentPage) {
      setCommentPagingInfo({
        ...commentPagingInfo,
        pageNum: commentPagingInfo.pageNum + 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCommentPage.moreCommentPage]);

  useEffect(() => {
    if (isLoadingComments) {
      const timer = setTimeout(() => {
        setIntersectionEnded(false);
        setLoadingComments(false);
        setCommentPagingInfo({
          ...commentPagingInfo,
          pageNum: commentPagingInfo.pageNum + 1,
        });
        if ((totalCommentCount as number) <= 0) {
          setNoComment(true);
        }
        if (currCommentPage.noMoreComments) {
          setNoMoreComments(true);
        }
      }, 700);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingComments]);

  //infinite scroll hook with IntersectionObserver
  const targetRef = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (!isFetchingComments && !isIntersectionEnded) {
        setIntersectionEnded(true);
        if (hasNoMoreComments || hasNoComment) {
          setLoadingComments(false);
        } else {
          setLoadingComments(true);
        }
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    },
    'comments_intersection_target',
  );

  return (
    <BlogPostFooterPresenter
      postId={postId}
      blogCommentsData={blogCommentsData}
      targetRef={targetRef}
      isLoadingComments={isLoadingComments}
      isFetchingComments={isFetchingComments}
      hasNoMoreComments={hasNoMoreComments}
      hasNoComment={hasNoComment}
    />
  );
};

export default memo(BlogPostFooterContainer);
