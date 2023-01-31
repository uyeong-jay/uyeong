import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@modals/Modal';
import AngleLeftIcon from '@icons/AngleLeftIcon';
import AngleUpIcon from '@icons/AngleUpIcon';
import React from 'react';
import Publish from '../Publish';
import { StyledWriteFooter } from './WriteFooterStyle';

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
        <AngleLeftIcon />
        나가기
      </button>
      {/* <button>임시저장</button> */}
      <button className="done-button" onClick={onClickDone}>
        완료 <AngleUpIcon />
      </button>
      <Modal type="alert" msg={writeErrMsg} isOpen={isModalOpen} setOpen={setModalOpen} />
      <Publish userData={userData} blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
    </StyledWriteFooter>
  );
};

export default WriteFooterPresenter;
