import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
// import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import BlogPostCommentsPresenter from './BlogPostCommentsPresenter';

interface Props {
  postId?: string;
}

const BlogPostCommentsContainer = ({ postId }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  // const { data: userData } = useGetUserDataQuery();
  const { data: blogCommentsData } = useGetBlogCommentsQuery(postTitle as string);

  return <BlogPostCommentsPresenter postId={postId} blogCommentsData={blogCommentsData} />;
};

export default BlogPostCommentsContainer;