import React, { useCallback, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import { useAppDispatch } from '@app/hooks';
import { done } from '@pages/Write/WriteSlice';
import validBlog from '@utils/valid/validBlog';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteFooterContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const { title, content } = blogPostInfo;
  const dispatch = useAppDispatch();
  const [writeErrMsg, setWriteErrMsg] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const onClickDone = useCallback(() => {
    if (!title || !content) {
      setWriteErrMsg(validBlog({ title, content }));
      return setModalOpen(true);
    } else dispatch(done());
  }, [content, dispatch, title]);

  return (
    <WriteFooterPresenter
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
