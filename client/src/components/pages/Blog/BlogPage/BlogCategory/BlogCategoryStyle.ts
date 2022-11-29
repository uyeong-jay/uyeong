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
  minheight: 1000px;

  //FORM
  & > form {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 800px;
    height: 150px;
    padding-left: 80px;

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

    //ERROR MESSAGE
    & > .blog-category-error {
      // border: 1px solid red;
      position: absolute;
      bottom: 25px;
      left: 205px;
    }
  }

  //CATEGORY CARDS WRAPPER
  & > div {
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    justify-content: center;
    width: 800px;
    height: 100%;
    margin-bottom: 100px;
  }
`;
