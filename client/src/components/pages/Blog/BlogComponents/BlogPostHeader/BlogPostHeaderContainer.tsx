import BlogPostHeaderPresenter from './BlogPostHeaderPresenter';
import { BlogPost, useGetBlogPostQuery } from '@app/services/blog/postApi';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useAppDispatch } from '@app/hooks';
import { setPostAuthInfo } from '@pages/Blog/BlogSlice';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostHeaderContainer = ({ blogPost }: Props) => {
  const router = useRouter();
  const { slug: postTitle } = router.query;
  const dispatch = useAppDispatch();

  const { data: userData } = useGetUserDataQuery();
  const { data: blogPostData } = useGetBlogPostQuery(postTitle as string);
  const { _id } = blogPostData?.post || {};

  const [isModalOpen, setModalOpen] = useState(false);

  const onClickDeletePost = useCallback(
    async (isCallback?: boolean) => {
      if (!isCallback) return setModalOpen(true);

      const data = {
        blogPostInfo: {
          _id,
        },
        token: userData?.access_token,
      };
      dispatch(setPostAuthInfo(data));
      await router.replace('/blog');
    },
    [_id, dispatch, router, userData?.access_token]
  );

  return (
    <BlogPostHeaderPresenter
      userData={userData}
      blogPost={blogPost}
      onClickDeletePost={onClickDeletePost}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
    />
  );
};

export default BlogPostHeaderContainer;
