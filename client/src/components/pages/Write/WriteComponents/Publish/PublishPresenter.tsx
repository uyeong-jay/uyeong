import PublishActionButtons from '../PublishActionButtons';
import PublishCategory from '../PublishCategory';
import PublishPreview from '../PublishPreview';
import PublishPrivacy from '../PublishPrivacy';
import PublishURL from '../PublishURL';
import { DIV } from './PublishStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogPostReq } from '@app/services/blog/postApi';
import { UserResponse } from '@app/services/user/userApi';
import { CloudinaryTypes } from '@src/pages/settings';

interface Props {
  userData?: UserResponse;
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  isPublishing: boolean;
  cloudinaryConfig: CloudinaryTypes;
}

const PublishPresenter = ({ userData, blogPostInfo, setBlogPostInfo, isPublishing, cloudinaryConfig }: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isPublishing);

  return (
    <>
      {render && (
        <DIV.PublishFrame animationName={show ? 'up-publish' : 'down-publish'} onAnimationEnd={() => onAnimationEnd}>
          <DIV.PublishGroup>
            <DIV.PublishLeftGroup>
              <h3>Post Preview</h3>
              <PublishPreview blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
            </DIV.PublishLeftGroup>
            <DIV.PublishRightGroup>
              <h3>Post Settings</h3>
              <DIV.PublishRightMain>
                <PublishCategory blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
                <PublishPrivacy blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
                <PublishURL blogPostInfo={blogPostInfo} />
              </DIV.PublishRightMain>
              <PublishActionButtons
                userData={userData}
                blogPostInfo={blogPostInfo}
                cloudinaryConfig={cloudinaryConfig}
              />
            </DIV.PublishRightGroup>
          </DIV.PublishGroup>
        </DIV.PublishFrame>
      )}
    </>
  );
};

export default PublishPresenter;
