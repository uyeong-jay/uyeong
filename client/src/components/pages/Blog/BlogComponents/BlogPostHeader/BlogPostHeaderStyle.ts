import styled from '@_settings/styled';

export const StyledBlogPostHeader = styled.header`
  border: 1px solid black;
  width: 100%;

  & > h1 {
    border: 1px solid black;
    text-align: center;
  }
  & > .blog-post-header-middle {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
  }
  & > .blog-post-header-bottom {
    border: 1px solid black;
    display: flex;

    & > .blog-post-tag {
      border: 1px solid black;
      margin: 10px;
    }
  }
`;
