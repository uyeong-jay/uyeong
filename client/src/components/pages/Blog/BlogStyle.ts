import styled from '@_settings/styled';

export const StyledBlog = styled.section`
  border: 1px solid #dadada;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
`;

export const StyledBlogHeader = styled.header`
  border: 1px solid #dadada;
  //background-color: #efe9e0;
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

export const StyledBlogPosts = styled.section`
  border: 1px solid #dadada;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-itmes: center;
`;
