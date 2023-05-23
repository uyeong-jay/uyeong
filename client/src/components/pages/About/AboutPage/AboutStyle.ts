import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

const depthEffect = `
  position: relative;
  top: 10px;
  left: 5px;

  &:before {
    content: '';
    width: inherit;
    min-width: inherit;
    height: 6px;
    min-height: 6px;
    background-color: #AFAFB0;
    position: absolute;
    top: -6px;
    left: -5px;
    // z-index: 1;
    transform: skew(60deg, 0deg);
  }
  &:after {
    content: '';
    width: 10px;
    min-width: 10px;
    height: inherit;
    min-height: inherit;
    background-color: #D2D2D3;
    position: absolute;
    top: -3px;
    left: -10px;
    // z-index: 1;
    transform: skew(0deg, 30deg);
  }
`;

SECTION.Layout = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};

  & > h1 {
    // border: 1px solid black;
    width: 100%;
    padding-left: 40px;
    padding-top: 40px;
    max-width: ${({ theme }) => theme.BP.PC};
  }
`;

DIV.AboutPart1 = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0 50px 0;

  & > div {
    border: 1px solid white;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    min-height: 180px;

    & .about-avatar-wrapper {
      // border: 1px solid red;
      display: inline-flex;
    }

    & .about-avatar {
      // border: 1px solid red;
      border-radius: 50%;
    }

    & p {
      // border: 1px solid black;
      font-size: 20px;
      letter-spacing: 3px;
    }
  }

  @media screen and (max-width: calc(${({ theme }) => theme.BP.PC} - 0.5px)) {
    & > div {
      ${depthEffect}
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      width: 300px;
      height: 180px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & > div {
      width: 300px;
      height: 180px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div {
      width: 700px;
      height: 350px;
      border-radius: 25px;
    }
  }
`;

DIV.AboutPart2 = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div:nth-of-type(1) {
    border: 1px solid white;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    min-width: 300px;
    min-height: 150px;
    margin: 0 0 50px 0;
    padding: 10px;

    & p {
      // border: 1px solid black;
      // margin-top: 5px;
    }
  }

  & > div:nth-of-type(2) {
    border: 1px solid white;
    background-color: white;
    min-width: 300px;
    min-height: 150px;
    height: 150px;
    padding: 10px;

    & > ul {
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      width: 100%;
      height: 100%;

      & li {
        // border: 1px solid black;
        display: flex;

        .location-icon {
          // border: 1px solid black;
          width: 13px;
          fill: #444444;
          margin-right: 7px;
        }
        .envelope-icon {
          width: 13px;
          fill: #444444;
          margin-right: 7px;
        }
        .github-icon {
          width: 14px;
          fill: #444444;
          margin-right: 7px;
        }
        .instagram-icon {
          width: 13px;
          fill: #444444;
          margin-right: 7px;
        }
      }
    }
  }

  @media screen and (max-width: calc(${({ theme }) => theme.BP.PC} - 0.5px)) {
    & > div:nth-of-type(1) {
      ${depthEffect}
    }
    & > div:nth-of-type(2) {
      ${depthEffect}
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 300px;
      height: 150px;
      margin: 0 0 50px 0;
    }
    & > div:nth-of-type(2) {
      width: 300px;
      height: 150px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 230px;
      height: 130px;
      min-width: 230px;
      min-height: 130px;
      margin: 0 20px 0 0;
    }
    & > div:nth-of-type(2) {
      width: 230px;
      height: 130px;
      min-width: 230px;
      min-height: 130px;
      margin: 0 0 0 20px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div:nth-of-type(1) {
      width: 330px;
      height: 230px;
      border-radius: 25px;
    }
    & > div:nth-of-type(2) {
      width: 330px;
      height: 230px;
      border-radius: 25px;
    }
  }
`;

DIV.AboutPart3 = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px;

  & > div {
    border: 1px solid white;
    background-color: white;
    min-width: 300px;
    min-height: 50px;
  }

  @media screen and (max-width: calc(${({ theme }) => theme.BP.PC} - 0.5px)) {
    & > div {
      ${depthEffect}
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      width: 300px;
      height: 50px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & > div {
      width: 500px;
      height: 80px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div {
      // position: relative;
      width: 700px;
      height: 120px;
      border-radius: 25px;
    }
  }
`;

DIV.AboutPart4 = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 50px;

  & > div:nth-of-type(1) {
    border: 1px solid white;
    background-color: white;
    width: 90%;
    height: 100.5%;
    min-width: 300px;
    min-height: 150px;
    margin: 0 0 50px 0;
    padding-bottom: 10px;

    & > h3 {
      padding: 10px 0 0 10px;
    }
  }
  & > div:nth-of-type(2) {
    border: 1px solid white;
    background-color: white;
    height: 100.5%;
    min-width: 300px;
    min-height: 150px;
    padding: 10px 0 0 10px;

    & > h3 {
      padding-bottom: 20px;
    }

    & > ul {
      // border: 1px solid black;
      padding-bottom: 10px;

      & > li {
        padding-bottom: 15px;
      }
    }
  }

  @media screen and (max-width: calc(${({ theme }) => theme.BP.PC} - 0.5px)) {
    & > div:nth-of-type(1) {
      ${depthEffect}
    }
    & > div:nth-of-type(2) {
      ${depthEffect}
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 300px;
      height: 100.5%;
      margin: 0 0 50px 0;
    }
    & > div:nth-of-type(2) {
      width: 300px;
      height: 100%;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    & > div:nth-of-type(1) {
      width: 230px;
      height: 100.5%;
      min-width: 230px;
      min-height: 130px;
      margin: 0 20px 0 0;
    }
    & > div:nth-of-type(2) {
      width: 230px;
      height: 100%;
      min-width: 230px;
      min-height: 130px;
      margin: 0 0 0 20px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div:nth-of-type(1) {
      width: 330px;
      height: 100.5%;
      padding: 5px;
      border-radius: 25px;
    }
    & > div:nth-of-type(2) {
      width: 330px;
      height: 100%;
      padding: 15px;
      border-radius: 25px;
    }
  }
`;
