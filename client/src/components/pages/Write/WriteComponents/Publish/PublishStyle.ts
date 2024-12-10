import styled from '@_settings/styled';

interface PublishProps {
  animationName: string;
}

export const DIV = {} as any;

DIV.PublishFrame = styled.div<PublishProps>`
  // border: 1px solid red;
  background-color: ${({ theme }) => theme.BG_C};
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  color: ${({ theme }) => theme.FONT_C};
  padding-bottom: 70px; // 모바일에서 주소창이 하단 or 상단에 있을경우 모두 하단에 공간 필요

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    padding-bottom: 0px;
  }

  animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

  @keyframes up-publish {
    from {
      top: 100%;
    }
    to {
      top: 0;
    }
  }

  @keyframes down-publish {
    from {
      top: 0;
    }
    to {
      top: 100%;
    }
  }
`;

DIV.PublishGroup = styled.div`
  // border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 96vw;
  min-width: ${({ theme }) => theme.BP.MOBILE};
  height: auto;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: row;
    justify-content: center;
    width: ${({ theme }) => theme.BP.TABLET};
    height: 500px;
  }
`;

DIV.PublishLeftGroup = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  padding: 50px 30px;

  & > h3 {
    // border: 1px solid black;
    margin-bottom: 20px;
    font-size: 25px;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 50%;
    padding: 0 30px;
  }
`;

DIV.PublishRightGroup = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 600px;
  padding: 50px 30px;

  & > h3 {
    // border: 1px solid black;
    margin-bottom: 20px;
    font-size: 25px;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 50%;
    height: 100%;
    padding: 0 30px;
  }

  //Publish-Action-Buttons
  & > div:nth-last-of-type(1) {
    // border: 1px solid black;
    height: 28%;
  }
`;

DIV.PublishRightMain = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 60%;
`;
