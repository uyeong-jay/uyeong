import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import { DIV } from './PublishActionButtonsStyle';
import MiniLoader from '@modals/MiniLoader';
import Modal from '@modals/Modal';

interface Props {
  postId: string | string[] | undefined;
  blogPostDataById: BlogPost;
  onClickCancel: () => void;
  onClickPost: () => void;
  onClickUpdate: () => void;
  isPosting: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  postNotCreatedError: any;
  postNotUpdatedError: any;
}

const PublishActionButtonsPresenter = ({
  postId,
  blogPostDataById,
  onClickCancel,
  onClickPost,
  onClickUpdate,
  isPosting,
  isModalOpen,
  setModalOpen,
  postNotCreatedError,
  postNotUpdatedError,
}: Props) => {
  return (
    <>
      <DIV.PublishActionButtons>
        <div>
          <button onClick={onClickCancel}>Cancel</button>
          {isPosting ? (
            <button style={{ cursor: 'default' }}>
              <MiniLoader w={20} h={20} />
            </button>
          ) : postId && blogPostDataById?._id === postId ? (
            <button onClick={onClickUpdate}>Update</button>
          ) : (
            <button onClick={onClickPost}>Post</button>
          )}
        </div>
        {isPosting && <DIV.PublishActionLoading></DIV.PublishActionLoading>}
      </DIV.PublishActionButtons>

      {(postNotCreatedError || postNotUpdatedError) && (
        <Modal
          type="alert"
          msg={postNotCreatedError?.data?.msg || postNotUpdatedError?.data?.msg}
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          shakeAlert
        />
      )}
    </>
  );
};

export default PublishActionButtonsPresenter;
