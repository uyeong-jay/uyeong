import React from 'react';
import { StyledPublishActionButtons } from './PublishActionButtonsStyle';
interface Props {
  onClickCancel: () => void;
}

const PublishActionButtonsPresenter = ({ onClickCancel }: Props) => {
  return (
    <StyledPublishActionButtons>
      <div className="action-buttons-block">
        <button className="cancel-button" type="button" onClick={onClickCancel}>
          Cancel
        </button>
        <button className="post-button">Post</button>
      </div>
    </StyledPublishActionButtons>
  );
};

export default PublishActionButtonsPresenter;
