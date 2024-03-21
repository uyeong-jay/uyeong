import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import { DIV } from './PublishActionButtonsStyle';
import MiniLoader from '@modals/MiniLoader';

interface Props {
  postId: string | string[] | undefined;
  blogPostDataById: BlogPost;
  onClickCancel: () => void;
  onClickPost: () => void;
  onClickUpdate: () => void;
  isClicked: boolean;
}

const PublishActionButtonsPresenter = ({
  postId,
  blogPostDataById,
  onClickCancel,
  onClickPost,
  onClickUpdate,
  isClicked,
}: Props) => {
  return (
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
  );
};

export default PublishActionButtonsPresenter;
