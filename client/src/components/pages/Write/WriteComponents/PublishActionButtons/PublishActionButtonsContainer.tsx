import React, { useCallback } from 'react';
import PublishActionButtonsPresenter from './PublishActionButtonsPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { cancelPublishing } from '@pages/Write/WriteSlice';
import { BlogPostReq, useCreateBlogPostMutation, useUpdateBlogPostMutation } from '@app/services/blog/postApi';
import getUploadImageUrl from '@utils/uploadImage';
import { UserResponse } from '@app/services/user/userApi';
import { useRouter } from 'next/router';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
}

const PublishActionButtonsContainer = ({ userData, blogPostInfo }: Props) => {
  const [createBlogPost] = useCreateBlogPostMutation();
  const [updateBlogPost] = useUpdateBlogPostMutation();
  const blogPostDataById = useAppSelector((state) => state.write.blogPostDataById);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: postId } = router.query;

  const onClickCancel = useCallback(() => {
    dispatch(cancelPublishing());
  }, [dispatch]);

  const onClickPost = useCallback(async () => {
    const data = {
      blogPostInfo: {
        ...blogPostInfo,
        //포스트시 이미지 업로드 하기
        thumbnail: await getUploadImageUrl(blogPostInfo.thumbnail as File),
      },
      token: userData?.access_token,
    };
    await createBlogPost(data);
    await router.push(`/blog/${blogPostInfo.title}`);

    dispatch(cancelPublishing());
  }, [blogPostInfo, createBlogPost, dispatch, router, userData?.access_token]);

  const onClickUpdate = useCallback(async () => {
    const data = {
      blogPostInfo: {
        ...blogPostInfo,
        _id: blogPostDataById._id,
        thumbnail:
          typeof blogPostInfo.thumbnail !== 'string'
            ? await getUploadImageUrl(blogPostInfo.thumbnail as File)
            : blogPostInfo.thumbnail,
      },
      token: userData?.access_token,
    };
    await updateBlogPost(data);
    await router.push(`/blog/${blogPostInfo.title}`);

    dispatch(cancelPublishing());
  }, [blogPostDataById._id, blogPostInfo, dispatch, router, updateBlogPost, userData?.access_token]);
  return (
    <PublishActionButtonsPresenter
      postId={postId}
      blogPostDataById={blogPostDataById}
      onClickCancel={onClickCancel}
      onClickPost={onClickPost}
      onClickUpdate={onClickUpdate}
    />
  );
};

export default PublishActionButtonsContainer;
