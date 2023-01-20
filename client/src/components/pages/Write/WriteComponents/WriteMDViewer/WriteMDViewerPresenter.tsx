import { lazy, Suspense } from 'react';
import { StyledWriteMDViewer } from './WriteMDViewerStyle';
import { BlogPostReq } from '@app/services/blog/postApi';
import Loader from '@modals/Loader';
// import MarkdownViewer from '@organisms/MarkdownViewer';
const MarkdownViewer = lazy(() => import('@organisms/MarkdownViewer'));

interface Props {
  blogPostInfo: BlogPostReq;
}

const WriteMDViewerPresenter = ({ blogPostInfo }: Props) => {
  return (
    <StyledWriteMDViewer>
      <Suspense fallback={<Loader />}>
        <MarkdownViewer content={blogPostInfo.content} />
      </Suspense>
    </StyledWriteMDViewer>
  );
};

export default WriteMDViewerPresenter;
