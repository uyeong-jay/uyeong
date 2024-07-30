import { BlogPost } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { SECTION } from './BlogPostStyle';
import Image from 'next/image';
import BlogPostFooter from '@pages/Blog/BlogComponents/BlogPostFooter';
import BlogPostHeader from '@pages/Blog/BlogComponents/BlogPostHeader';
// import MarkdownViewer from '@organisms/MarkdownViewer';
import dynamic from 'next/dynamic';
import MiniLoader from '@atoms/MiniLoader';

const MarkdownViewer = dynamic(() => import('@organisms/MarkdownViewer'), {
  loading: () => (
    <div className="mini-loader-wrapper">
      <MiniLoader w={25} />
    </div>
  ), // 로딩 중에 표시할 UI
  ssr: false, // 서버 사이드 렌더링 비활성화
});

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { _id, thumbnail, content } = blogPost || {};

  if (!_id) return <NotFound />;
  return (
    <SECTION.Frame>
      <BlogPostToc />
      <BlogPostHeader blogPost={blogPost} />
      <article>
        {thumbnail && (
          <div className="blog-post-image-wrapper" id="post-thumbnail-wrapper">
            <Image
              className="blog-post-image"
              src={thumbnail as string}
              alt="blog post image"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        )}
        <div id="markdown-content">
          <MarkdownViewer content={content ?? ''} />
        </div>
      </article>
      <BlogPostFooter postId={_id} />
    </SECTION.Frame>
  );
};

export default BlogPostPresenter;
