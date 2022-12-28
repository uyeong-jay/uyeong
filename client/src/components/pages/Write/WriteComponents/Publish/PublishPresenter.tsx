import PublishActionButtons from '../PublishActionButtons';
import PublishCategory from '../PublishCategory';
import PublishPreview from '../PublishPreview';
import PublishPrivacy from '../PublishPrivacy';
import PublishURL from '../PublishURL';
import { StyledPublish } from './PublishStyle';
import useAnimation from '@hooks/useAnimation';
import { BlogPostReq } from '@app/services/blog/blogPostApi';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
  isPublish: boolean;
}

const PublishPresenter = ({ blogPostInfo, setBlogPostInfo, isPublish }: Props) => {
  const [show, render, onAnimationEnd] = useAnimation(isPublish);

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
              <PublishActionButtons />
            </div>
          </div>
        </StyledPublish>
      )}
    </>
  );
};

export default PublishPresenter;
