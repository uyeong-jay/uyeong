import BlogPostHeaderPresenter from './BlogPostHeaderPresenter';
import { BlogPost, useDeleteBlogPostMutation, useGetBlogPostQuery } from '@app/services/blog/postApi';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetUserDataQuery } from '@app/services/user/userApi';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostHeaderContainer = ({ blogPost }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;

  const { data: userData } = useGetUserDataQuery();
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const { data: blogPostData } = useGetBlogPostQuery(postTitle as string);
  const { _id } = blogPostData?.post || {};

  const [isModalOpen, setModalOpen] = useState(false);

  const onClickDeletePost = useCallback(
    async (isCallback?: boolean) => {
      if (!isCallback) return setModalOpen(true);
      await router.push('/');
      const data = {
        blogPostInfo: {
          _id,
        },
        token: userData?.access_token,
      };
      await deleteBlogPost(data);
    },
    [_id, deleteBlogPost, router, userData?.access_token],
  );

  return (
    <BlogPostHeaderPresenter
      blogPost={blogPost}
      onClickDeletePost={onClickDeletePost}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
    />
  );
};

export default BlogPostHeaderContainer;
