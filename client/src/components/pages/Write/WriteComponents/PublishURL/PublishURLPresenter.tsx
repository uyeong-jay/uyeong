import React from 'react';
import { StyledPublishURL } from './PublishURLStyle';

const PublishURLPresenter = () => {
  return (
    <StyledPublishURL>
      <div>
        URL
        <span>|</span>
        <span>/slug/1</span>
      </div>
    </StyledPublishURL>
  );
};

export default PublishURLPresenter;
