import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { useRouter } from 'next/router';
import BlogPostFooterPresenter from './BlogPostFooterPresenter';
import { memo } from 'react';

interface Props {
  postId?: string;
}

const BlogPostFooterContainer = ({ postId }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: blogCommentsData } = useGetBlogCommentsQuery(postTitle as string);

  return <BlogPostFooterPresenter postId={postId} blogCommentsData={blogCommentsData} />;
};

export default memo(BlogPostFooterContainer);
