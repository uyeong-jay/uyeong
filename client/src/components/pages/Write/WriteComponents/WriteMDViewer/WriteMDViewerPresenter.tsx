import { DIV } from './WriteMDViewerStyle';
import ScreenLoader from '@organisms/ScreenLoader';
// import MarkdownViewer from '@organisms/MarkdownViewer';

import dynamic from 'next/dynamic';

const MarkdownViewer = dynamic(() => import('@organisms/MarkdownViewer'), {
  loading: () => <ScreenLoader />,
  ssr: false,
});

interface Props {
  blogPostContent: string;
}

const WriteMDViewerPresenter = ({ blogPostContent }: Props) => {
  return (
    <DIV.WriteMDViewerFrame>
      <MarkdownViewer content={blogPostContent} />
    </DIV.WriteMDViewerFrame>
  );
};

export default WriteMDViewerPresenter;
