import React, { useCallback, useState } from 'react';
import WriteFooterPresenter from './WriteFooterPresenter';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import { useAppDispatch } from '@app/hooks';
import { done } from '@pages/Write/WriteSlice';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteFooterContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const { title, content } = blogPostInfo;
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const onClickDone = useCallback(() => {
    if (!title || !content) setModalOpen(true);
    else dispatch(done());
    return;
  }, [content, dispatch, title]);

  //삭제 함수 > 모달 true > 모달 삭제 클릭 > 삭제함수 >  모달 뛰어넘기

  return (
    <WriteFooterPresenter
      blogPostInfo={blogPostInfo}
      setBlogPostInfo={setBlogPostInfo}
      isModalOpen={isModalOpen}
      setModalOpen={setModalOpen}
      onClickDone={onClickDone}
    />
  );
};

export default WriteFooterContainer;
