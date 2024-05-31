import React, { useCallback, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq, BlogPostRes } from '@app/services/blog/postApi';
import { useAppDispatch } from '@app/hooks';
import { startPuslishing } from '@pages/Write/WriteSlice';
import validBlog from '@utils/valid/validBlog';
import { UserResponse } from '@app/services/user/userApi';
import { useRouter } from 'next/router';

interface Props {
  userData?: UserResponse;
  blogPostsData?: BlogPostRes;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteFooterContainer = ({ userData, blogPostsData, blogPostInfo, setBlogPostInfo }: Props) => {
  const router = useRouter();

  const { title, content } = blogPostInfo;
  const [writeErrMsg, setWriteErrMsg] = useState('');
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  //동일한 포스트 제목 생성 막는 유효성 검사
  const validBlogTitle = useCallback(() => {
    const duplicateBlogTitle = blogPostsData?.posts?.find((post) => post.title === title);
    if (!router.query.id && duplicateBlogTitle) {
      return true;
    } else return false;
  }, [blogPostsData?.posts, router.query, title]);

  const onClickDone = useCallback(() => {
    const blogTitleErr = validBlogTitle();
    const blogErr = validBlog({ title, content });
    if (blogTitleErr) {
      setWriteErrMsg('The post title already exists. Please change the title.');
      return setPostModalOpen(true);
    } else if (blogErr) {
      setWriteErrMsg(blogErr);
      return setPostModalOpen(true);
    } else dispatch(startPuslishing());
  }, [content, dispatch, title, validBlogTitle]);

  const onClickExit = useCallback(
    (isCallback?: boolean) => {
      if (!isCallback) return setExitModalOpen(true);
      router.back();
    },
    [router],
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
    />
  );
};

export default WriteFooterContainer;
