import styled from '@_settings/styled';

export const MAIN = {} as any;
export const DIV = {} as any;

MAIN.Frame = styled.main`
  // border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  min-width: 320px;
  min-height: 750px;
  margin-bottom: 250px;

  @media screen and (min-height: 500px) and (min-width: 850px) {
    align-items: center;
    top: -70px;
    width: 100%; //가로 스크롤 방지
    height: 100vh;
    min-width: 0px;
    min-height: 0px;
    margin-bottom: 100px;
  }
`;

DIV.ContainerWidth = styled.div`
  // border: 1px solid black;
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (min-height: 500px) and (min-width: 850px) {
    border-top: 3px solid ${({ theme }) => theme.BD_C};
    border-bottom: 3px solid ${({ theme }) => theme.BD_C};
    top: 30px;
    width: 800px;
    height: 320px;
    transform: rotate(-2deg);
  }
`;

DIV.ContainerHeight = styled.div`
  // border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    border-top: none;
  }

  @media screen and (min-height: 500px) and (min-width: 850px) {
    border-right: 3px solid ${({ theme }) => theme.BD_C};
    border-left: 3px solid ${({ theme }) => theme.BD_C};
    flex-direction: row;
    top: -12.5%;
    left: 5%;
    width: 90%;
    height: 125%;

    &::after {
      border-left: 3px solid ${({ theme }) => theme.BD_C};
      top: 0;
      right: 45%;
      width: 0%;
      height: 100%;
    }
  }
`;

DIV.BannerBlock = styled.div`
  // border: 1px solid red;
  position: relative;
  width: 100%;
  height: 90vh;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    // border-top: 2px solid ${({ theme }) => theme.BD_C};
    width: 90%;
  }

  @media screen and (min-height: 500px) and (min-width: 850px) {
    left: 0;
    width: 55%;
    height: 80%;

    &::after {
      display: none;
    }
  }
`;

DIV.SummaryBlock = styled.div`
  // border: 1px solid black;
  background-color: ${({ theme }) => theme.INITIAL_BG_C};
  transition: background-color 0.25s linear; // for theme mode
  position: relative;
  width: 80%;
  height: 400px;
  margin-top: 50px;
  border-radius: 20px;

  @media screen and (min-height: 500px) and (min-width: 850px) {
    background-color: transparent;
    left: 0%;
    width: 45%;
    height: 80%;
    margin-left: 1px; //scoll 오른쪽에 뜨는 공간 없앰
    margin-top: 0px;
    transform: rotate(0deg);
    border-radius: 0px;
  }

  & > section {
    animation: active-summary 0.25s ease-in-out 0s forwards;

    @keyframes active-summary {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

DIV.ActiveBtns = styled.div`
  // border: 1px solid black;
  position: absolute;
  bottom: -45px;
  right: 50%;
  transform: translateX(50%);

  & > button {
    border: 2px solid ${({ theme }) => theme.BD_C};
    background-color: ${({ theme }) => theme.INITIAL_BG_C};
    width: 25px;
    height: 25px;
    padding: 0; // 모바일 환경에서 width가 더 작게 조절되도록 padding 제거
    border-radius: 50%;
    margin: 0 10px;

    &.active {
      background-color: ${({ theme }) => theme.BD_C};
    }
  }

  @media screen and (min-height: 500px) and (min-width: 850px) {
    bottom: -40px;
    right: 10px;
    transform: translateX(0%);

    & > button {
      width: 23px;
      height: 23px;
      border: 3px solid ${({ theme }) => theme.BD_C};
    }
  }

  // 모바일에서는 깜빡 거림이 있어 테블릿 크기 위로만 적용
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & > button {
      transition: background-color 0.25s ease-in-out;
    }
  }
`;
