import { BlogPostReq } from '@app/services/blog/blogPostApi';
import Modal from '@modals/Modal';
import React from 'react';
import Publish from '../Publish';
import { StyledWriteFooter } from './WriteFooterStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onClickDone: () => void;
}

const WriteFooterPresenter = ({ blogPostInfo, setBlogPostInfo, isModalOpen, setModalOpen, onClickDone }: Props) => {
  return (
    <StyledWriteFooter>
      <button>나가기</button>
      <button>임시저장</button>
      <button onClick={onClickDone}>완료</button>
      <Modal type="alert" msg="에러에러" isOpen={isModalOpen} setOpen={setModalOpen} />
      <Publish blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
    </StyledWriteFooter>
  );
};

export default WriteFooterPresenter;
