import styled from '@_settings/styled';

export const DIV = {} as any;
export const P = {} as any;

DIV.Frame = styled.div`
  // border: 1px solid black;
  margin: 50px; //MOBILE also
  position: relative;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    margin: 70px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    margin: 40px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    margin: 60px;
  }

  & .blog-category-card-image-wrapper {
    // border: 1px solid black;
    display: inline-flex;
    position: relative;
    width: 100%;
    cursor: pointer;

    // w:h = 3:2
    // width: 300px; //MOBILE also
    height: 200px;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
      // width: 360px;
      height: 240px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      // width: 320px;
      height: 215px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      // width: 380px;
      height: 250px;
    }

    //이미지있는 곳에만 배경색 추가
    & .blog-category-card-image {
      background-color: ${({ theme }) => theme.INITIAL_BG_C};
    }

    //LOGO Wrapper
    & > div {
      border: 3px solid ${({ theme }) => theme.BD_C};
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & .logo {
        // border: 1px solid black;
        width: 30px;
        height: 60px;
        transform: translateY(7px);
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }
  }
`;

DIV.CardContent = styled.div`
  // border: 1px solid black;
`;

DIV.CardContentMain = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  margin: 10px 5px;

  & > input {
    // border: 1px solid red;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.BD_C};
    background-color: ${({ theme }) => theme.BG_C};
    width: 85%;
    padding: 4px 0;
    outline: none;
    color: ${({ theme }) => theme.FONT_C};
    font-size: 17px; // 편집시 전체 카드 움직임 방지
    font-weight: bold;
  }

  & > span {
    // border: 1px solid red;
    overflow: hidden;
    width: 90%;
    text-overflow: ellipsis;

    & > a {
      // border: 1px solid red;
      display: inline-block;
      width: 100%;
      padding: 5px 0;
      font-size: 17px;
      font-weight: bold;
      color: ${({ theme }) => theme.FONT_C};

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

//ERROR MSG
P.CardTitleError = styled.p`
  // border: 1px solid red;
  position: relative;
  bottom: 5px;
  left: 0;
  padding-left: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.FONT_C_DANGER};
`;

DIV.CardContentFooter = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 5px;

  font-weight: bold;

  & > span {
    // border: 1px solid black;
  }
`;
