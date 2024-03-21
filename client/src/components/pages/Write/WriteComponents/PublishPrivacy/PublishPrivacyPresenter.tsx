import { BlogPostReq } from '@app/services/blog/postApi';
import EarthIcon from '@icons/EarthIcon';
import LockIcon from '@icons/LockIcon';
import React from 'react';
import { BTN, DIV } from './PublishPrivacyStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  onClickPublic: () => void;
  onClickPrivate: () => void;
}

const PublishPrivacyPresenter = ({ blogPostInfo, onClickPublic, onClickPrivate }: Props) => {
  return (
    <DIV.PublishPrivacy>
      <div>
        <BTN.PublicButton isPublicClicked={!blogPostInfo?.privacy ? true : false} onClick={onClickPublic}>
          <EarthIcon /> Public
        </BTN.PublicButton>
        <BTN.PrivateButton isPrivateClicked={blogPostInfo?.privacy ? true : false} onClick={onClickPrivate}>
          <LockIcon /> Private
        </BTN.PrivateButton>
      </div>
    </DIV.PublishPrivacy>
  );
};

export default PublishPrivacyPresenter;
