import PublishActionButtons from '../PublishActionButtons';
import PublishCategory from '../PublishCategory';
import PublishPreview from '../PublishPreview';
import PublishPrivacy from '../PublishPrivacy';
import PublishURL from '../PublishURL';
import { StyledPublish } from './PublishStyle';
import { useAnimation } from '@hooks/useAnimation';
import { BlogPostReq } from '@app/services/blog/blogPostApi';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  isPublish: boolean;
}

const PublishPresenter = ({ blogPostInfo, setBlogPostInfo, isPublish }: Props) => {
  const [toggle, showAnimation, onAnimationEnd] = useAnimation(isPublish);

  return (
    <>
      {showAnimation && (
        <StyledPublish animationName={toggle ? 'up-publish' : 'down-publish'} onAnimationEnd={() => onAnimationEnd}>
          <div className="publish-block">
            <div className="publish-right-group">
              <PublishPreview blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
            </div>
            <div className="publish-left-group">
              <PublishCategory blogPostInfo={blogPostInfo} setBlogPostInfo={setBlogPostInfo} />
              <PublishPrivacy />
              <PublishURL />
              <PublishActionButtons />
            </div>
          </div>
        </StyledPublish>
      )}
    </>
  );
};

export default PublishPresenter;
