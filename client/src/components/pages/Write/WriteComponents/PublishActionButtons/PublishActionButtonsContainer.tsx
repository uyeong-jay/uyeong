import React, { useCallback, useState } from 'react';
import PublishActionButtonsPresenter from './PublishActionButtonsPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { cancelPublishing } from '@pages/Write/WriteSlice';
import { BlogPostReq, useCreateBlogPostMutation, useUpdateBlogPostMutation } from '@app/services/blog/postApi';
import getUploadImageUrl from '@utils/uploadImage';
import { UserResponse } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { fileStatus } from '@pages/Write/WriteSlice';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
}

const PublishActionButtonsContainer = ({ userData, blogPostInfo }: Props) => {
  const [createBlogPost] = useCreateBlogPostMutation();
  const [updateBlogPost] = useUpdateBlogPostMutation();

  const blogPostDataById = useAppSelector((state) => state.write.blogPostDataById);
  const fileState = useAppSelector((state) => state.write.fileState);
  const { unchanged, modified } = fileStatus;
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { id: postId } = router.query;

  const [isClicked, setClicked] = useState(false);

  const onClickCancel = useCallback(() => {
    dispatch(cancelPublishing());
  }, [dispatch]);

  const onClickPost = useCallback(async () => {
    setClicked(true);

    const data = {
      blogPostInfo: {
        ...blogPostInfo,
        //포스트시 클라우드에 이미지 업로드 하기
        //사용자가 이미지를 제거했는지 복구했는지 확인 후 업로드
        thumbnail:
          fileState === unchanged
            ? blogPostInfo.thumbnail
            : fileState === modified
            ? await getUploadImageUrl(blogPostInfo.thumbnail as File)
            : '',
      },
      token: userData?.access_token,
    };
    await createBlogPost(data);
    await router.push(`/blog/${blogPostInfo.title.replace(/\s+/g, '-')}`);

    dispatch(cancelPublishing());
  }, [blogPostInfo, createBlogPost, dispatch, fileState, modified, router, unchanged, userData?.access_token]);

  const onClickUpdate = useCallback(async () => {
    setClicked(true);

    const data = {
      blogPostInfo: {
        ...blogPostInfo,
        _id: blogPostDataById?._id,
        //포스트시 클라우드에 이미지 업로드 하기
        //사용자가 이미지를 제거했는지 복구했는지 확인 후 업로드
        thumbnail:
          fileState === unchanged
            ? blogPostInfo.thumbnail
            : fileState === modified
            ? await getUploadImageUrl(blogPostInfo.thumbnail as File)
            : '',
      },
      token: userData?.access_token,
    };
    await updateBlogPost(data);
    await router.push(`/blog/${blogPostInfo.title.replace(/\s+/g, '-')}`);
  }, [
    blogPostDataById?._id,
    blogPostInfo,
    fileState,
    modified,
    router,
    unchanged,
    updateBlogPost,
    userData?.access_token,
  ]);
  return (
    <PublishActionButtonsPresenter
      postId={postId}
      blogPostDataById={blogPostDataById}
      onClickCancel={onClickCancel}
      onClickPost={onClickPost}
      onClickUpdate={onClickUpdate}
      isClicked={isClicked}
    />
  );
};

export default PublishActionButtonsContainer;
