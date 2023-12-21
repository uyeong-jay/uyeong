import { memo } from 'react';
import { BlogPostRes } from '@app/services/blog/postApi';
import BlogPostCard from '../BlogPostCard';
import styled from '@_settings/styled';
import { v4 as uuid } from 'uuid';

interface Propss {
  blogPostsBySearch?: BlogPostRes;
}

export const DIV = {} as any;

DIV.BlogPostsWrapper = styled.div`
  // border: 1px solid black;
`;

DIV.NoPostsFound = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  font-size: 14px;
  height: 200px;
`;

DIV.InitialPostsCard = styled.div`
  border: 2px solid ${({ theme }) => theme.BD_C};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  width: ${({ theme }) => theme.BP.MOBILE};
  height: 500px;
  margin-bottom: 130px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 100px)) {
    border: none;
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET})) {
    width: 450px;
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    border: 2px solid ${({ theme }) => theme.BD_C};
    border-radius: 20px;
    flex-direction: row;
    width: 600px;
    height: 300px;
    min-height: 300px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 800px;
    height: 400px;
  }
`;

DIV.NoMorePosts = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  font-size: 14px;
`;

const POSTCOUNT = 4;
export const InitialPostsCardArr = Array.from({ length: POSTCOUNT }, (_v, index) => index);

const BlogPosts = ({ blogPostsBySearch }: Propss) => {
  return (
    <DIV.BlogPostsWrapper>
      {blogPostsBySearch?.posts ? (
        blogPostsBySearch?.posts?.map((post) =>
          post ? <BlogPostCard key={post._id} post={post} /> : <div key={uuid()}></div>,
        )
      ) : blogPostsBySearch?.matchingPosts === false ? (
        <DIV.NoPostsFound>- No posts found in the search -</DIV.NoPostsFound>
      ) : (
        //새로고침시 보이는 화면
        <>
          {InitialPostsCardArr.map((cardCountIndex) => (
            <DIV.InitialPostsCard key={cardCountIndex}></DIV.InitialPostsCard>
          ))}
        </>
      )}
      {!blogPostsBySearch?.next_cursor && blogPostsBySearch?.matchingPosts && (
        <DIV.NoMorePosts>- No more posts -</DIV.NoMorePosts>
      )}
    </DIV.BlogPostsWrapper>
  );
};

export default memo(BlogPosts);
