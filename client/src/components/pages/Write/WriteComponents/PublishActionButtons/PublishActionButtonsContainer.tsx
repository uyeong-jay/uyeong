import React, { useCallback } from 'react';
import PublishActionButtonsPresenter from './PublishActionButtonsPresenter';
import { useAppDispatch } from '@app/hooks';
import { cancelPublishing } from '@pages/Write/WriteSlice';
import { BlogPostReq, useCreateBlogPostMutation } from '@app/services/blog/postApi';
import getUploadImageUrl from '@utils/uploadImage';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
}

const PublishActionButtonsContainer = ({ userData, blogPostInfo }: Props) => {
  const [createBlogPost] = useCreateBlogPostMutation();
  const dispatch = useAppDispatch();

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

    dispatch(cancelPublishing());
  }, [blogPostInfo, createBlogPost, dispatch, userData?.access_token]);
  return <PublishActionButtonsPresenter onClickCancel={onClickCancel} onClickPost={onClickPost} />;
};

export default PublishActionButtonsContainer;
