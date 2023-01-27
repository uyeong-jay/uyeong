import styled from '@_settings/styled';

export const StyledBlogPostComment = styled.section`
  border: 1px solid green;
  width: 100%;
  // height: 300px;

  & > form {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    height: 100%;

    & > textarea {
      border: 1px solid green;
      width: 100%;
      resize: none; //textarea 크기조절 막기
      height: 150px;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 8px;
    }
    & > button {
      border: 1px solid green;
      width: 100px;
      align-self: end;
      margin-top: 10px;
    }
  }

  & > .blog-comment-MDviewer-group {
    border: 1px solid green;

    & > .blog-comment-MDviewer {
      border: 1px solid green;
    }
  }
`;
