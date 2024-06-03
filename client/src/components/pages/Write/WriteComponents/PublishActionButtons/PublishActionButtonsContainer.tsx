import React, { useCallback, useEffect, useState } from 'react';
import PublishActionButtonsPresenter from './PublishActionButtonsPresenter';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { cancelPublishing } from '@pages/Write/WriteSlice';
import { BlogPostReq, useCreateBlogPostMutation, useUpdateBlogPostMutation } from '@app/services/blog/postApi';
import { deleteImage, getPublicIdFromUrl, uploadImage } from '@utils/imageUtils';
import { UserResponse } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { fileStatus } from '@pages/Write/WriteSlice';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
}

const PublishActionButtonsContainer = ({ userData, blogPostInfo }: Props) => {
  const router = useRouter();
  const { id: postId } = router.query;

  const [createBlogPost, { isSuccess: isPostCreated, error: postNotCreatedError }] = useCreateBlogPostMutation();
  const [updateBlogPost, { isSuccess: isPostUpdated, error: postNotUpdatedError }] = useUpdateBlogPostMutation();

  const blogPostDataById = useAppSelector((state) => state.write.blogPostDataById);
  const fileState = useAppSelector((state) => state.write.fileState);
  const dispatch = useAppDispatch();

  const [isPosting, setPosting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [prevPostImage, setPrevPostImage] = useState('');
  const { unchanged, modified } = fileStatus;

  //유저 업데이트 성공시 이전 업로드된 이미지 삭제
  useEffect(() => {
    if (isPostUpdated && prevPostImage && blogPostDataById.thumbnail !== prevPostImage) {
      const publicId = getPublicIdFromUrl(prevPostImage);
      if (publicId) deleteImage(publicId);
      setPrevPostImage('');
    }
  }, [blogPostDataById.thumbnail, isPostUpdated, prevPostImage]);

  useEffect(() => {
    if (isPostCreated || isPostUpdated) {
      router.push(`/blog/${blogPostInfo.title.replace(/\s+/g, '-')}`);
    }
    if (postNotCreatedError || postNotUpdatedError) {
      setModalOpen(true);
    }
  }, [blogPostInfo.title, isPostCreated, isPostUpdated, postNotCreatedError, postNotUpdatedError, router]);

  const onClickCancel = useCallback(() => {
    dispatch(cancelPublishing());
  }, [dispatch]);

  const onClickPost = useCallback(async () => {
    setPosting(true);

    const data = {
      blogPostInfo: {
        ...blogPostInfo,
      },
      token: userData?.access_token,
    };

    //포스트시 클라우드에 이미지 업로드 하기
    //사용자가 이미지를 제거했는지 복구했는지 확인 후 업로드
    if (fileState === unchanged) {
      data.blogPostInfo.thumbnail = blogPostInfo.thumbnail;
    } else if (fileState === modified) {
      const uploadedImageData = await uploadImage(blogPostInfo.thumbnail as File);
      data.blogPostInfo.thumbnail = uploadedImageData?.url;
    } else {
      data.blogPostInfo.thumbnail = '';
    }

    await createBlogPost(data);

    dispatch(cancelPublishing());
  }, [blogPostInfo, createBlogPost, dispatch, fileState, modified, unchanged, userData?.access_token]);

  const onClickUpdate = useCallback(async () => {
    setPosting(true);
    setPrevPostImage(blogPostDataById.thumbnail ?? '');

    const data = {
      blogPostInfo: {
        ...blogPostInfo,
        _id: blogPostDataById?._id,
      },
      token: userData?.access_token,
    };

    //포스트시 클라우드에 이미지 업로드 하기
    //사용자가 이미지를 제거했는지 복구했는지 확인 후 업로드
    if (fileState === unchanged) {
      data.blogPostInfo.thumbnail = blogPostInfo.thumbnail;
    } else if (fileState === modified) {
      const uploadedImageData = await uploadImage(blogPostInfo.thumbnail as File);
      data.blogPostInfo.thumbnail = uploadedImageData?.url;
    } else {
      data.blogPostInfo.thumbnail = '';
    }

    await updateBlogPost(data);
  }, [
    blogPostDataById?._id,
    blogPostDataById.thumbnail,
    blogPostInfo,
    fileState,
    modified,
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
      isPosting={isPosting}
      postNotCreatedError={postNotCreatedError}
      postNotUpdatedError={postNotUpdatedError}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
    />
  );
};

export default PublishActionButtonsContainer;
