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
  isClicked: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  createBlogPostError: any;
  updateBlogPostError: any;
}

const PublishActionButtonsPresenter = ({
  postId,
  blogPostDataById,
  onClickCancel,
  onClickPost,
  onClickUpdate,
  isClicked,
  isModalOpen,
  setModalOpen,
  createBlogPostError,
  updateBlogPostError,
}: Props) => {
  return (
    <>
      <DIV.PublishActionButtons>
        <div>
          <button onClick={onClickCancel}>Cancel</button>
          {isClicked ? (
            <button style={{ cursor: 'default' }}>
              <MiniLoader w={20} h={20} />
            </button>
          ) : postId && blogPostDataById?._id === postId ? (
            <button onClick={onClickUpdate}>Update</button>
          ) : (
            <button onClick={onClickPost}>Post</button>
          )}
        </div>
      </DIV.PublishActionButtons>

      {(createBlogPostError || updateBlogPostError) && (
        <Modal
          type="alert"
          msg={createBlogPostError.data.msg || updateBlogPostError.data.msg}
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          shakeAlert
        />
      )}
    </>
  );
};

export default PublishActionButtonsPresenter;
