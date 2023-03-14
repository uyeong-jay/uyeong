import { BlogPost } from '@app/services/blog/postApi';
import React from 'react';
import { StyledPublishActionButtons } from './PublishActionButtonsStyle';

interface Props {
  blogPostDataById: BlogPost;
  onClickCancel: () => void;
  onClickPost: () => void;
  onClickUpdate: () => void;
}

const PublishActionButtonsPresenter = ({ blogPostDataById, onClickCancel, onClickPost, onClickUpdate }: Props) => {
  return (
    <StyledPublishActionButtons>
      <div className="action-buttons-block">
        <button className="cancel-button" onClick={onClickCancel}>
          Cancel
        </button>
        {blogPostDataById ? (
          <button className="post-button" onClick={onClickUpdate}>
            Update
          </button>
        ) : (
          <button className="post-button" onClick={onClickPost}>
            Post
          </button>
        )}
      </div>
    </StyledPublishActionButtons>
  );
};

export default PublishActionButtonsPresenter;
