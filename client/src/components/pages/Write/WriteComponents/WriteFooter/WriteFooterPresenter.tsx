import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@modals/Modal';
import React from 'react';
import Publish from '../Publish';
import { StyledWriteFooter } from './WriteFooterStyle';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import ArrowUpIcon from '@icons/ArrowUpIcon';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  writeErrMsg: string;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onClickDone: () => void;
}

const WriteFooterPresenter = ({
  userData,
  blogPostInfo,
  setBlogPostInfo,
  writeErrMsg,
  isModalOpen,
  setModalOpen,
  onClickDone,
}: Props) => {
  return (
    <StyledWriteFooter>
      <button className="back-button">
        <ArrowLeftIcon />
        Exit
      </button>
      <button className="done-button" onClick={onClickDone}>
        Done <ArrowUpIcon />
      </button>

      <Publish userData={userData} blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />

      <Modal type="alert" msg={writeErrMsg} isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />
    </StyledWriteFooter>
  );
};

export default WriteFooterPresenter;
