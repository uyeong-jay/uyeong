import React from 'react';
import { StyledPublishActionButtons } from './PublishActionButtonsStyle';
interface Props {
  onClickCancel: () => void;
  onClickPost: () => void;
}

const PublishActionButtonsPresenter = ({ onClickCancel, onClickPost }: Props) => {
  return (
    <StyledPublishActionButtons>
      <div className="action-buttons-block">
        <button className="cancel-button" onClick={onClickCancel}>
          Cancel
        </button>
        <button className="post-button" onClick={onClickPost}>
          Post
        </button>
      </div>
    </StyledPublishActionButtons>
  );
};

export default PublishActionButtonsPresenter;
