import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@modals/Modal';
import React from 'react';
import Publish from '../Publish';
import { StyledWriteFooter } from './WriteFooterStyle';

interface Props {
  userData: UserResponse | undefined;
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
      <button>
        <i className="fa-solid fa-angle-left"></i> 나가기
      </button>
      {/* <button>임시저장</button> */}
      <button onClick={onClickDone}>
        완료 <i className="fa-solid fa-angle-up"></i>
      </button>
      <Modal type="alert" msg={writeErrMsg} isOpen={isModalOpen} setOpen={setModalOpen} />
      <Publish userData={userData} blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
    </StyledWriteFooter>
  );
};

export default WriteFooterPresenter;
