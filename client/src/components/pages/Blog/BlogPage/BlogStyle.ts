import styled from '@_settings/styled';

export const StyledBlog = styled.section`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
`;

export const StyledBlogContents = styled.div`
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-itmes: center;
  position: relative;
  width: 100%;
  height: 700px;
`;

export const StyledTags = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledPosts = styled.section`
  border: 1px solid blue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-itmes: center;
  width: 800px;
  // margin: 100px auto 100px auto;
`;
