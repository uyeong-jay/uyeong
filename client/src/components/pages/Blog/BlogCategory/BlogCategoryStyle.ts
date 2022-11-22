import styled from '@_settings/styled';

export const StyledBlogCategory = styled.section`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
`;

export const StyledBlogCategoryContents = styled.section`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 700px;

  //FORM
  & > form {
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 150px;
    margin-left: 80px;

    // InputBox
    & > div {
      // border: 1px solid black;

      & > label {
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      & > input {
        width: 400px;
        height: 40px;
      }
    }

    //Button
    & > button {
      border-radius: 10px;
      margin-left: 10px;
      height: 40px;
    }
  }

  //CATEGORY CARDS WRAPPER
  & > div {
    border: 1px solid black;
    width: 800px;
    height: 550px;
  }
`;
