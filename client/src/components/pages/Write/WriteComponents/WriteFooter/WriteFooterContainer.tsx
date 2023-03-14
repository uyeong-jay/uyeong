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
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  //동일한 포스트 제목 생성 막는 유효성 검사
  const validBlogTitle = useCallback(() => {
    const sameBlogTitle = blogPostsData?.posts?.find((post) => post.title === title);
    if (!router.query.id && sameBlogTitle) return true;
    else return false;
  }, [blogPostsData?.posts, router.query, title]);

  const onClickDone = useCallback(() => {
    const blogTitleErr = validBlogTitle();
    const blogErr = validBlog({ title, content });
    if (blogTitleErr) {
      setWriteErrMsg('동일한 포스트 제목이 존재합니다.');
      return setModalOpen(true);
    } else if (blogErr) {
      setWriteErrMsg(blogErr);
      return setModalOpen(true);
    } else dispatch(startPuslishing());
  }, [content, dispatch, title, validBlogTitle]);

  return (
    <WriteFooterPresenter
      userData={userData}
      blogPostInfo={blogPostInfo}
      setBlogPostInfo={setBlogPostInfo}
      writeErrMsg={writeErrMsg}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onClickDone={onClickDone}
    />
  );
};

export default WriteFooterContainer;
