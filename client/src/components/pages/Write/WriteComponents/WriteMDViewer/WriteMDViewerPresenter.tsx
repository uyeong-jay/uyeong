import { DIV } from './WriteMDViewerStyle';
import { BlogPostReq } from '@app/services/blog/postApi';
import ScreenLoader from '@organisms/ScreenLoader';
// import MarkdownViewer from '@organisms/MarkdownViewer';

import dynamic from 'next/dynamic';

const MarkdownViewer = dynamic(() => import('@organisms/MarkdownViewer'), {
  loading: () => <ScreenLoader />, // 로딩 중에 표시할 UI
  ssr: false, // 서버 사이드 렌더링 비활성화
});

interface Props {
  blogPostInfo: BlogPostReq;
  memoizedContent: string;
}

const WriteMDViewerPresenter = ({ blogPostInfo, memoizedContent }: Props) => {
  return (
    <DIV.WriteMDViewerFrame>
      <MarkdownViewer content={!memoizedContent ? blogPostInfo.content : memoizedContent} />
    </DIV.WriteMDViewerFrame>
  );
};

export default WriteMDViewerPresenter;
