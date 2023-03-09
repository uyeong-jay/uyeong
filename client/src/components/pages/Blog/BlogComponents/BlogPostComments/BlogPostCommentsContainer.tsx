import { useGetBlogCommentsQuery } from '@app/services/blog/commentApi';
import { socket } from '@pages/Blog/BlogPage/BlogPost/BlogPostContainer';
// import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BlogPostCommentsPresenter from './BlogPostCommentsPresenter';

interface Props {
  postId?: string;
}

const BlogPostCommentsContainer = ({ postId }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  // const { data: userData } = useGetUserDataQuery();
  const { data: blogCommentsData } = useGetBlogCommentsQuery(postTitle as string);

  useEffect(() => {
    socket.on('createComment', (data) => {
      console.log(data);
    });
  }, [postTitle]);

  return <BlogPostCommentsPresenter postId={postId} blogCommentsData={blogCommentsData} />;
};

export default BlogPostCommentsContainer;
