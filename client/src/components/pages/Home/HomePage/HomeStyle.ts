import styled from '@_settings/styled';

export const MAIN = {} as any;
export const DIV = {} as any;

MAIN.Frame = styled.main`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -50px;
  width: 100%; //가로 스크롤 방지
  min-width: 320px;
  margin: 0 auto;
  height: 100vh;

  @media screen and (max-width: calc(${({ theme }) => theme.BP.PC} - 0.5px)) {
    min-height: 900px;
  }
`;

DIV.ContainerWidth = styled.div`
  border-top: 1px solid ${({ theme }) => theme.BD_C};
  border-bottom: 1px solid ${({ theme }) => theme.BD_C};
  position: relative;
  // w : h = 2 : 5
  width: 800px;
  height: 320px;

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    border-top: 1px solid ${({ theme }) => theme.BD_C};
    border-bottom: 1px solid ${({ theme }) => theme.BD_C};
    transform: rotate(90deg);
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    border-top: 3px solid ${({ theme }) => theme.BD_C};
    border-bottom: 3px solid ${({ theme }) => theme.BD_C};
    top: 40px;
    transform: rotate(88deg);
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    top: 20px;
    transform: rotate(-2deg);
  }
`;

DIV.ContainerHeight = styled.div`
  border-right: 1px solid ${({ theme }) => theme.BD_C};
  border-left: 1px solid ${({ theme }) => theme.BD_C};
  width: 90%;
  height: 125%;
  position: relative;
  top: -12.5%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 55%;
    width: 0.5px; //border: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.BD_C};
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    border-right: 3px solid ${({ theme }) => theme.BD_C};
    border-left: 3px solid ${({ theme }) => theme.BD_C};

    &::after {
      width: 2.3px; //border: 3px
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    &::after {
      right: 45%;
    }
  }
`;

DIV.BannerBlock = styled.div`
  // border: 1px solid red;
  position: relative;
  left: -5%;
  width: 55%;
  height: 80%;
  transform: rotate(-90deg);

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    left: 0;
    width: 55%;
    height: 80%;
    transform: rotate(0deg);
  }
`;

DIV.SummaryBlock = styled.div`
  // border: 1px solid red;
  position: relative;
  left: -5%;
  width: 44.5%; //scroll 크기 딱 맞게 조정
  height: 99%; //튀어 나가는 부분 없이 조정
  transform: rotate(-90deg);

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    border-radius: 50%;
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    // border: 1px solid black;
    margin: 1px 0;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.BD_C};
    border-radius: 10px;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    left: 0%;
    width: 45%;
    height: 80%;
    margin-left: 1px; //scoll 오른쪽에 뜨는 공간 없앰
    transform: rotate(0deg);
  }
`;
