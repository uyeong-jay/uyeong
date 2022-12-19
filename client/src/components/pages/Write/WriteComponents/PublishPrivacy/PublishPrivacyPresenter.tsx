import React from 'react';
import { StyledPublishPrivacy } from './PublishPrivacyStyle';

const PublishPrivacyPresenter = () => {
  return (
    <StyledPublishPrivacy>
      <div className="privacy-block">
        <button className="public-button">
          <i className="fa-solid fa-earth-americas fa-xl"></i> Public
        </button>
        <button className="private-button">
          <i className="fa-solid fa-lock fa-xl"></i> Private
        </button>
      </div>
    </StyledPublishPrivacy>
  );
};

export default PublishPrivacyPresenter;
