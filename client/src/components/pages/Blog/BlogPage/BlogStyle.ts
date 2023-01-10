import styled from '@_settings/styled';

export const StyledBlog = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  width: 1200px;
`;

export const StyledBlogContents = styled.div`
  border: 1px solid black;
  display: flex;
  // justify-content: start;
  // align-itmes: center;
  width: 100%;
  min-height: 700px;
`;

export const StyledPosts = styled.section`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  padding: 50px 0;
`;

export const StyledTags = styled.aside`
  border: 1px solid red;
  width: 200px;

  & > .tags-wrapper {
    border: 1px solid blue;
    width: 100%;
    height: 100%;
  }
`;
