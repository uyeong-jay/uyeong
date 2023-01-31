import { BlogPostReq } from '@app/services/blog/postApi';
import EarthIcon from '@icons/EarthIcon';
import LockIcon from '@icons/LockIcon';
import React, { CSSProperties, useMemo } from 'react';
import { StyledPublishPrivacy } from './PublishPrivacyStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  onClickPublic: () => void;
  onClickPrivate: () => void;
}

//클릭 하면
const PublishPrivacyPresenter = ({ blogPostInfo, onClickPublic, onClickPrivate }: Props) => {
  const clickedBtnStyle = useMemo(() => {
    return {
      backgroundColor: 'silver',
      // pointerEvents: 'none', //이 효과가 없어도 hover효과 없어짐
      userSelect: 'none',
      cursor: 'pointer',
      color: 'black',
    };
  }, []);

  return (
    <StyledPublishPrivacy>
      <div className="privacy-block">
        <button
          className="public-button"
          onClick={onClickPublic}
          style={!blogPostInfo?.privacy ? (clickedBtnStyle as CSSProperties) : undefined}
        >
          <EarthIcon clicked={!blogPostInfo?.privacy ? true : false} /> Public
        </button>
        <button
          className="private-button"
          onClick={onClickPrivate}
          style={blogPostInfo?.privacy ? (clickedBtnStyle as CSSProperties) : undefined}
        >
          <LockIcon clicked={blogPostInfo?.privacy ? true : false} /> Private
        </button>
      </div>
    </StyledPublishPrivacy>
  );
};

export default PublishPrivacyPresenter;
