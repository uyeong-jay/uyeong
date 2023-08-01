import { memo } from 'react';
import { useAppSelector } from '@app/hooks';
import { BlogPostRes } from '@app/services/blog/postApi';
import BlogPostCard from '../BlogPostCard';
import styled from '@_settings/styled';

interface Propss {
  blogPostsData?: BlogPostRes;
  blogPostsBySearch?: BlogPostRes;
}

const DIV = {} as any;

DIV.BlogPostsWrapper = styled.div`
  border: 1px solid black;
`;

const BlogPosts = ({ blogPostsData, blogPostsBySearch }: Propss) => {
  const tagName = useAppSelector((state) => state.blog.tagName);

  return (
    <DIV.BlogPostsWrapper>
      <div>{!blogPostsData && <div>No Posts!</div>}</div>
      {/* client-(검색된)포스트(o,x) or server-(일반)포스트 */}
      {blogPostsBySearch?.posts ? (
        blogPostsBySearch?.posts?.map((post) => {
          console.log('1');
          return <BlogPostCard key={post._id} post={post} />;
        })
      ) : blogPostsBySearch?.msg === 'No blogs' ? (
        <div>검색된 블로그가 없습니다.</div>
      ) : (
        !tagName &&
        blogPostsData?.posts?.map((post) => {
          console.log('2');
          return <BlogPostCard key={post._id} post={post} />;
        })
      )}
    </DIV.BlogPostsWrapper>
  );
};

export default memo(BlogPosts);
