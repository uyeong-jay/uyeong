import React, { useCallback, useEffect, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq, useCreateBlogPostMutation, useUpdateBlogPostMutation } from '@app/services/blog/postApi';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { startPuslishing } from '@pages/Write/WriteSlice';
import validBlog from '@utils/valid/validBlog';
import { UserResponse } from '@app/services/user/userApi';
import { useRouter } from 'next/router';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  cloudinaryConfig: CloudinaryTypes;
}

const WriteFooterContainer = ({ userData, blogPostInfo, setBlogPostInfo, cloudinaryConfig }: Props) => {
  const [updateBlogPost, { isSuccess: isPostUpdated, isError: isPostUpdateError }] = useUpdateBlogPostMutation();
  const [createBlogPost, { isSuccess: isPostCreated, isError: isPostCreateError }] = useCreateBlogPostMutation();

  const blogPostDataById = useAppSelector((state) => state.write.blogPostDataById);

  const router = useRouter();

  const { title, content } = blogPostInfo;
  const [writeErrMsg, setWriteErrMsg] = useState('');
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  //포스트 제목 중복 유효성 검사
  useEffect(() => {
    if (isPostUpdateError || isPostCreateError) {
      setWriteErrMsg('The post title already exists. Please change the title.');
      return setPostModalOpen(true);
    }
    if (isPostUpdated || isPostCreated) {
      dispatch(startPuslishing());
    }
  }, [dispatch, isPostCreateError, isPostCreated, isPostUpdateError, isPostUpdated]);

  const onClickDone = useCallback(() => {
    const blogData = {
      blogPostInfo: {
        ...blogPostInfo,
        _id: blogPostDataById?._id,
        title,
      },
      token: userData?.access_token,
      titleCheck: 'true',
    };

    const blogErr = validBlog({ title, content });

    if (blogErr) {
      setWriteErrMsg(blogErr);
      return setPostModalOpen(true);
    } else {
      blogPostDataById ? updateBlogPost(blogData) : createBlogPost(blogData);
    }
  }, [blogPostDataById, blogPostInfo, content, createBlogPost, title, updateBlogPost, userData?.access_token]);

  const onClickExit = useCallback(
    (isCallback?: boolean) => {
      if (!isCallback) return setExitModalOpen(true);
      router.back();
    },
    [router]
  );

  return (
    <WriteFooterPresenter
      userData={userData}
      blogPostInfo={blogPostInfo}
      setBlogPostInfo={setBlogPostInfo}
      writeErrMsg={writeErrMsg}
      isPostModalOpen={isPostModalOpen}
      setPostModalOpen={setPostModalOpen}
      onClickDone={onClickDone}
      isExitModalOpen={isExitModalOpen}
      setExitModalOpen={setExitModalOpen}
      onClickExit={onClickExit}
      cloudinaryConfig={cloudinaryConfig}
    />
  );
};

export default WriteFooterContainer;
