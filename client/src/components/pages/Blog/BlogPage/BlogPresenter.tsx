import { StyledBlog, StyledBlogContents, StyledPosts, StyledTags } from './BlogStyle';
import Head from 'next/head';
import BlogPostCard from '@pages/Blog/BlogComponents/BlogPostCard';
import BlogHeader from '@pages/Blog/BlogComponents/BlogHeader';
import { BlogPostRes } from '@app/services/blog/postApi';
import { TagWithCount } from './BlogContainer';
// import MoreButton from '@atoms/MoreButton';

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
