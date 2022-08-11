import Head from 'next/head';
import styled from '@_settings/styled';
import BlogPostCard from '@molecules/BlogPostCard';
import { BlogProps } from '@_types/types-blog';
import MoreButton from '@atoms/MoreButton';

const StyledBlog = styled.section`
  border: 1px solid #dadada;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
`;

const StyledBlogHeader = styled.header`
  border: 1px solid #dadada;
  background-color: #efe9e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 200px;
  margin: 10px auto 10px auto;
  border-radius: 30px;

  & > h3 {
    margin-bottom: 10px;
  }
`;

const StyledBlogPosts = styled.section`
  border: 1px solid #dadada;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-itmes: center;
`;

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
