import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { useRouter } from 'next/router';
import BlogPostCommentsPresenter from './BlogPostCommentsPresenter';
import { memo } from 'react';

interface Props {
  postId?: string;
}

const BlogPostCommentsContainer = ({ postId }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const { data: blogCommentsData } = useGetBlogCommentsQuery(postTitle as string);

  return <BlogPostCommentsPresenter postId={postId} blogCommentsData={blogCommentsData} />;
};

export default memo(BlogPostCommentsContainer);
