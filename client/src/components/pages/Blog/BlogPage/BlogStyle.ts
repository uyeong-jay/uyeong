import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
  color: ${({ theme }) => theme.FONT_C};
`;

DIV.BlogBlock = styled.div`
  // border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: cneter;
  position: relative;
  width: 100%;
  margin-bottom: 100px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: auto;
    min-height: 1000px;
    margin-top: 50px;
    border-left: 2px solid ${({ theme }) => theme.BD_C};
    border-right: 2px solid ${({ theme }) => theme.BD_C};

    //BlogMain의 왼쪽 테두리에 종속
    &::after {
      border-left: 2px solid ${({ theme }) => theme.BD_C};
      content: '';
      position: absolute;
      top: 0px;
      left: 227px;
      height: 100%;
    }
  }
`;

SECTION.BlogMain = styled.section`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  min-height: 700px;
  padding-top: 50px;

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    // border-left: 2px solid ${({ theme }) => theme.BD_C};
    min-width: 800px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    min-width: 1000px;
  }
`;

DIV.SearchBar = styled.div`
  // border: 1px solid black;
  border-bottom: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  position: relative;
  min-width: 300px;
  margin-bottom: 100px;

  & > span {
    // border: 2px solid black;
    display: flex;
    height: 27px;
    cursor: pointer;
    position: absolute;
    top: 7px;
    right: 45px;

    & > svg {
      // border: 1px solid black;
      fill: ${({ theme }) => theme.BD_C};
      width: 27px;
      padding: 5px;
    }
  }

  & > svg {
    // border: 2px solid black;
    fill: ${({ theme }) => theme.BD_C};
    width: 40px;
    padding: 0 10px;
  }

  & > div {
    // border: 1px solid black;
    width: 100%;

    & > input {
      // border: 1px solid red;
      width: 100%;
      padding-left: 10px;
      padding-right: 40px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 300px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 300px)) {
    width: 400px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    width: 500px;
  }
`;

DIV.IntersectionTarget = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  aglin-items: center;
  height: 50px;
  width: 100%;
`;

DIV.NoMorePosts = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  font-size: 14px;
`;
