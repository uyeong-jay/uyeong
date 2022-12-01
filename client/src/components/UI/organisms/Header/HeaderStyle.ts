import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  // border: 1px solid #dadada;
  border: 1px solid red;
  // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
`;

export const StyledHeaderNav = styled.nav`
  // background-color: #d3d5c9;
  // border: 1px solid #dadada;
  // border: 1px solid green;
  width: 1000px;
  height: 60px;

  & > ul {
    // border: 1px solid #dadada;
    border: 1px solid blue;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 30px;

    & > li > a {
      // border: 1px solid black;
      //다크모드
      color: blue;
    }

    & > li:nth-of-type(5) {
      // border: 1px solid black;
      position: relative;
      cursor: pointer;
      width: 100px;

      & .user-avatar-container {
        display: inline-flex;
        border: solid 5px rgba(0, 255, 0, 0.5);
      }

      & .user-avatar {
        border-radius: 50%;
        object-fit: cover; //원본크기로 넣기
      }

      & .fa-caret-down {
        // border: 1px solid black;
        position: absolute;
        top: 13px;
        left: 48px; //30+13+5
      }

      & > ul {
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        z-index: 999;
        left: -2px;
        width: 130px;
        height: 200px;
        border-radius: 10px;
        background-color: white;

        & > li {
          width: 100%;
          height: 100%;

          & > button,
          a {
            // border: 1px solid black;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 7px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
  }
  //+스크롤시 nav width만 남도록 하기
`;
