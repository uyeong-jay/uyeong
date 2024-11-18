import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@organisms/Modal';
import React from 'react';
import Publish from '../Publish';
import { DIV } from './WriteFooterStyle';
import ArrowLeftIcon from '@icons/ArrowLeftIcon';
import ArrowUpIcon from '@icons/ArrowUpIcon';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  writeErrMsg: string;
  isPostModalOpen: boolean;
  setPostModalOpen: (isPostModalOpen: boolean) => void;
  onClickDone: () => void;
  isExitModalOpen: boolean;
  setExitModalOpen: (isPostModalOpen: boolean) => void;
  onClickExit: (isCallback?: boolean) => void;
  cloudinaryConfig: CloudinaryTypes;
}

const WriteFooterPresenter = ({
  userData,
  blogPostInfo,
  setBlogPostInfo,
  writeErrMsg,
  isPostModalOpen,
  setPostModalOpen,
  onClickDone,
  isExitModalOpen,
  setExitModalOpen,
  onClickExit,
  cloudinaryConfig,
}: Props) => {
  return (
    <DIV.WriteFooterFrame>
      <button className="back-button" onClick={() => onClickExit()}>
        <ArrowLeftIcon />
        Exit
      </button>
      <button className="done-button" onClick={onClickDone}>
        Done <ArrowUpIcon />
      </button>

      <Publish
        userData={userData}
        blogPostInfo={blogPostInfo}
        setBlogPostInfo={setBlogPostInfo}
        cloudinaryConfig={cloudinaryConfig}
      />

      <Modal type="alert" msg={writeErrMsg} isOpen={isPostModalOpen} setOpen={setPostModalOpen} shakeAlert />

      <Modal
        type="confirm"
        msg={`The newly entered content will be lost. \n Are you sure you want to exit?`}
        isOpen={isExitModalOpen}
        setOpen={setExitModalOpen}
        callback={() => onClickExit(true)}
        shakeAlert
      />
    </DIV.WriteFooterFrame>
  );
};

export default WriteFooterPresenter;
