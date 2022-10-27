import { StyledBlog, StyledBlogHeader, StyledBlogPosts } from './BlogStyle';
import Head from 'next/head';
import BlogPostCard from '@molecules/BlogPostCard';
import { BlogProps } from '@_types/types-blog';
import MoreButton from '@atoms/MoreButton';

const BlogPresenter = ({ posts, title, description }: BlogProps) => {
  //posts: slug, frontMatter(date, title, description, tags)
  //title
  //description

  return (
    <>
      <Head>
        <title>UYeong | Blog</title>
      </Head>
      <StyledBlog>
        {!posts && <div>No Posts!</div>}
        <StyledBlogHeader>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>검색바</p>
        </StyledBlogHeader>
        <StyledBlogPosts>{posts && posts.map((post) => <BlogPostCard key={post.slug} post={post} />)}</StyledBlogPosts>
        <MoreButton text="더보기" />
      </StyledBlog>
    </>
  );
};

export default BlogPresenter;
