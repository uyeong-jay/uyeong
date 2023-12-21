import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  width: 100%;
`;

DIV.Content = styled.div`
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 1000px;
  padding-top: 100px;
`;

DIV.CategoryCardGroup = styled.div`
  // border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-content: center;
  width: ${({ theme }) => theme.BP.MOBILE}; //MOBILE also
  margin-bottom: 80px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    width: 500px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 800px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    width: 1000px;
  }
`;

DIV.InitialCategoryCard = styled.div`
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

  & > div:nth-of-type(1) {
    border: 3px solid ${({ theme }) => theme.BD_C};
    height: 200px;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
      height: 240px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      height: 215px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      height: 250px;
    }
  }

  & > div:nth-of-type(2) {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.INITIAL_BG_C};
    margin-top: 10px;
    height: 20px;
  }

  & > div:nth-of-type(3) {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.INITIAL_BG_C};
    margin: 10px 0;
    height: 20px;
  }
`;

DIV.PageBtnGroup = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 160px;

  & > button {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
    fill: ${({ theme }) => theme.FONT_C};

    & .angle-double-left-icon {
      // border: 1px solid black;
      width: 18px;
    }
    & .angle-left-icon {
      // border: 1px solid black;
      width: 10px;
    }
    & .angle-right-icon {
      // border: 1px solid black;
      width: 10px;
    }
    & .angle-double-right-icon {
      // border: 1px solid black;
      width: 18px;
    }

    &.disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
`;

BTN.PageNumBtn = styled.button`
  // border: 1px solid blue;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.FONT_C};

  &.aa {
    position: relative;

    &::after {
      // border: 1px soild red;
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 2.5px;
      background-color: ${({ theme }) => theme.BD_C};
      border-radius: 20px;
    }
  }
`;
