import BlogPostPresenter from './BlogPostPresenter';
import { useRouter } from 'next/router';
import { useGetBlogPostQuery } from '@app/services/blog/postApi';
// import { io } from 'socket.io-client';

// export const socket = io(
//   'http://localhost:5000' /* , {
//   withCredentials: true,
// } */,
// );

const BlogPostContainer = () => {
  const router = useRouter();

  const { slug: postTitle } = router.query;

  const { data: blogPostData } = useGetBlogPostQuery(postTitle as string);

  const { post: blogPost } = blogPostData || {};

  // useEffect(() => {
  //   const postId = blogPost?._id;
  //   if (!postId || !socket) return;
  //   socket.emit('joinRoom', postId);

  //   return () => {
  //     socket.emit('outRoom', postId);
  //   };
  // }, [blogPost?._id]);

  return <BlogPostPresenter blogPost={blogPost} />;
};

export default BlogPostContainer;
