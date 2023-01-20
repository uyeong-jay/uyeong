import { StyledBlog, StyledBlogContents, StyledPosts, StyledTags } from './BlogStyle';
import Head from 'next/head';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import { TagWithCount } from './BlogContainer';
import dynamic from 'next/dynamic';
import Loader from '@modals/Loader';
const BlogPostCard: any = dynamic(() => import('@pages/Blog/BlogComponents/BlogPostCard') as any, {
  loading: () => <Loader />,
});

interface Props {
  blogPostsData?: BlogPostRes;
  allTags: TagWithCount[];
}

const BlogPresenter = ({ blogPostsData, allTags }: Props) => {
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
            {blogPostsData?.posts?.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </StyledPosts>
        </StyledBlogContents>
        {/* <MoreButton text="더보기" /> */}
      </StyledBlog>
    </>
  );
};

export default BlogPresenter;
