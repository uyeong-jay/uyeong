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

    //LOGO Wrapper
    & > div {
      border: 3px solid ${({ theme }) => theme.BD_C};
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-radius: 20px;

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
  margin: 10px 10px;

  & > input {
    // border: 1px solid red;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.BD_C};
    background-color: ${({ theme }) => theme.BG_C};
    width: 85%;
    outline: none;
    color: ${({ theme }) => theme.FONT_C};
    font-size: 14.5px; // 편집시 전체 카드 움직임 방지
    font-weight: bold;
  }

  & > span {
    // border: 1px solid red;
    width: 90%;

    //텍스트 오버 되면 ... 으로 대체
    overflow: hidden;
    text-overflow: ellipsis;

    & > a {
      font-size: 17px;
      font-weight: bold;
      color: ${({ theme }) => theme.FONT_C};
    }
  }
`;

//ERROR MSG
P.CardTitleError = styled.p`
  // border: 1px solid red;
  position: relative;
  bottom: 5px;
  left: 0;
  padding-left: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.FONT_C_DANGER};
`;

DIV.CardContentFooter = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 10px;
  font-weight: bold;

  & > span {
    // border: 1px solid black;
  }
`;
