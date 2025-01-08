import BlogPostHeaderPresenter from './BlogPostHeaderPresenter';
import { BlogPost, useGetBlogPostQuery } from '@app/services/blog/postApi';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetUserDataQuery } from '@app/services/user/userApi';
import { useAppDispatch } from '@app/hooks';
import { setPostAuthInfo } from '@pages/Blog/BlogSlice';
import { CloudinaryTypes } from '@src/pages/settings';
import { deleteImage, getPublicIdFromUrl } from '@utils/imageUtils';

interface Props {
  blogPost?: BlogPost;
  cloudinaryConfig: CloudinaryTypes;
}

const BlogPostHeaderContainer = ({ blogPost, cloudinaryConfig }: Props) => {
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

      // 클라우드에 저장된 해당 포스트 썸네일 삭제
      if (blogPost?.thumbnail && typeof blogPost.thumbnail === 'string') {
        const publicId = getPublicIdFromUrl(blogPost?.thumbnail);
        if (publicId) await deleteImage(publicId, cloudinaryConfig);
      }

      // 포스트 인증 정보 전달
      dispatch(setPostAuthInfo(data));

      // 블로그 페이지로 리다이렉트
      await router.replace('/blog');
    },
    [_id, blogPost?.thumbnail, cloudinaryConfig, dispatch, router, userData?.access_token]
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
