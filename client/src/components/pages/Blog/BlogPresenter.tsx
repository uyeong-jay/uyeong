import { StyledBlog, StyledBlogContents, StyledPosts, StyledTags } from './BlogStyle';
import Head from 'next/head';
import BlogPostCard from './BlogPost/BlogPostCard';
import { BlogProps } from '@_types/types-blog';
import BlogHeader from './BlogHeader';
// import MoreButton from '@atoms/MoreButton';

const BlogPresenter = ({ posts }: BlogProps) => {
  //posts: slug, frontMatter(date, title, description, tags)

  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <StyledBlog>
        {!posts && <div>No Posts!</div>}
        <BlogHeader />
        <StyledBlogContents>
          <StyledTags>tags</StyledTags>
          <StyledPosts>{posts && posts.map((post) => <BlogPostCard key={post.slug} post={post} />)}</StyledPosts>
        </StyledBlogContents>
        {/* <MoreButton text="더보기" /> */}
      </StyledBlog>
    </>
  );
};

export default BlogPresenter;
