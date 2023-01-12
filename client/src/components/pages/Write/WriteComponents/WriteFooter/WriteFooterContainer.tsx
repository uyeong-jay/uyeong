import React, { useCallback, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq, BlogPostRes } from '@app/services/blog/postApi';
import { useAppDispatch } from '@app/hooks';
import { startPuslishing } from '@pages/Write/WriteSlice';
import validBlog from '@utils/valid/validBlog';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData?: UserResponse;
  blogPostsData?: BlogPostRes;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteFooterContainer = ({ userData, blogPostsData, blogPostInfo, setBlogPostInfo }: Props) => {
  const { title, content } = blogPostInfo;
  const [writeErrMsg, setWriteErrMsg] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  //동일한 포스트 제목 생성 막기
  const validBlogTitle = useCallback(() => {
    const sameBlogTitle = blogPostsData?.posts?.find((post) => post.title === title);
    console.log('a');
    if (sameBlogTitle) return true;
    else return false;
  }, [blogPostsData?.posts, title]);

  const onClickDone = useCallback(() => {
    if (!title || !content) {
      setWriteErrMsg(validBlog({ title, content }));
      return setModalOpen(true);
    } else if (validBlogTitle()) {
      setWriteErrMsg('동일한 포스트 제목이 존재합니다.');
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
