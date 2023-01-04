import PublishActionButtons from '../PublishActionButtons';
import PublishCategory from '../PublishCategory';
import PublishPreview from '../PublishPreview';
import PublishPrivacy from '../PublishPrivacy';
import PublishURL from '../PublishURL';
import { StyledPublish } from './PublishStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';

interface Props {
  userData: UserResponse | undefined;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  isPublishing: boolean;
}

const PublishPresenter = ({ userData, blogPostInfo, setBlogPostInfo, isPublishing }: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isPublishing);

  return (
    <>
      {render && (
        <StyledPublish animationName={show ? 'up-publish' : 'down-publish'} onAnimationEnd={() => onAnimationEnd}>
          <div className="publish-block">
            <div className="publish-right-group">
              <PublishPreview blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
            </div>
            <div className="publish-left-group">
              <PublishCategory blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
              <PublishPrivacy blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
              <PublishURL />
              <PublishActionButtons userData={userData} blogPostInfo={blogPostInfo} />
            </div>
          </div>
        </StyledPublish>
      )}
    </>
  );
};

export default PublishPresenter;
