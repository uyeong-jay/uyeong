import styled from '@_settings/styled';

export const StyledBlogHeader = styled.header`
  border: 1px solid green;
  //background-color: #efe9e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 200px;
  // margin: 10px auto 10px auto;
  // border-radius: 50px;

  & > h3 {
    margin-bottom: 10px;
  }
`;

export const StyledBlogHeaderNav = styled.nav`
  // border: 1px solid black;
  position: absolute;
  bottom: 0;
  left: 200px;
  width: 200px;
  height: 70px;

  & > ul {
    // border: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    & > li {
      border: 1px solid blue;
      padding: 5px 10px;
      border-radius: 15px;
    }
  }
`;
