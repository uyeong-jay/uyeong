import React, { useCallback, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq } from '@app/services/blog/postApi';
import { useAppDispatch } from '@app/hooks';
import { startPuslishing } from '@pages/Write/WriteSlice';
import validBlog from '@utils/valid/validBlog';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData: UserResponse | undefined;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteFooterContainer = ({ userData, blogPostInfo, setBlogPostInfo }: Props) => {
  const { title, content } = blogPostInfo;
  const dispatch = useAppDispatch();
  const [writeErrMsg, setWriteErrMsg] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const onClickDone = useCallback(() => {
    if (!title || !content) {
      setWriteErrMsg(validBlog({ title, content }));
      return setModalOpen(true);
    } else dispatch(startPuslishing());
  }, [content, dispatch, title]);

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
