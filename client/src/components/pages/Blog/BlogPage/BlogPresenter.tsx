import { StyledBlog, StyledBlogContents, StyledPosts, StyledTags } from './BlogStyle';
import Head from 'next/head';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import { TagWithCount } from './BlogContainer';
import dynamic from 'next/dynamic';
import Loader from '@modals/Loader';
import { useAppSelector } from '@app/hooks';
const BlogPostCard: any = dynamic(() => import('@pages/Blog/BlogComponents/BlogPostCard') as any, {
  loading: () => <Loader />,
});

interface Props {
  blogPostsData?: BlogPostRes;
  blogPostsDataBySearch?: BlogPostRes;
  allTags: TagWithCount[];
}

const BlogPresenter: React.FC<Props> = ({ blogPostsData, blogPostsDataBySearch, allTags }) => {
  const tagName = useAppSelector((state) => state.blog.tagName);
  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <StyledBlog>
        {!blogPostsData && <div>No Posts!</div>}
        <BlogHeader />
        <StyledBlogContents>
          <StyledTags>
            <div className="tags-wrapper">
              {allTags.map((tag, index) => (
                <div key={index}>
                  {tag.name} ({tag.count})
                </div>
              ))}
            </div>
          </StyledTags>
          <StyledPosts>
            {/* 검색된 포스트(o,x) or 일반 포스트 */}
            {blogPostsDataBySearch?.posts ? (
              blogPostsDataBySearch?.posts?.map((post) => <BlogPostCard key={post._id} post={post} />)
            ) : blogPostsDataBySearch?.msg === 'No blogs' ? (
              <div>검색된 블로그가 없습니다.</div>
            ) : (
              !tagName && blogPostsData?.posts?.map((post) => <BlogPostCard key={post._id} post={post} />)
            )}
          </StyledPosts>
        </StyledBlogContents>
      </StyledBlog>
    </>
  );
};

export default BlogPresenter;
