import { BlogPostReq } from '@app/services/blog/blogPostApi';
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
          <i className="fa-solid fa-earth-americas fa-xl"></i> Public
        </button>
        <button
          className="private-button"
          onClick={onClickPrivate}
          style={blogPostInfo?.privacy ? (clickedBtnStyle as CSSProperties) : undefined}
        >
          <i className="fa-solid fa-lock fa-xl"></i> Private
        </button>
      </div>
    </StyledPublishPrivacy>
  );
};

export default PublishPrivacyPresenter;
