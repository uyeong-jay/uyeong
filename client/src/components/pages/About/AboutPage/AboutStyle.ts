import styled from '@_settings/styled';

interface AboutBlogProps {
  isKorean: boolean;
}

export const DIV = {} as any;

const rightBorder = (color: string) => `
  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: 20px;
    height: 80%;
    border-left: 2px solid ${color};
  }
`;

DIV.AboutMeAvatar = styled.div`
  // border: 1px solid black;
  margin-bottom: 120px;
`;

DIV.AboutMe = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  font-size: 15px;

  & > div:nth-of-type(1) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    min-width: 300px;
    min-height: 130px;
    margin: 0 0 100px 0;
    padding: 10px 10px 0 50px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > ul:nth-of-type(1) {
      // border: 1px solid black;
      list-style-type: disc;
      margin-top: -20px;

      & li {
        // border: 1px solid black;
        margin: 20px 10px;
      }
    }

    & > a {
      color: ${({ theme }) => theme.FONT_C};

      &:hover {
        opacity: 0.5;
      }
    }
  }

  & > div:nth-of-type(2) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    min-width: 300px;
    min-height: 150px;
    height: 150px;
    padding: 10px 10px 0 50px;
    ${({ theme }) => rightBorder(theme.BD_C)}

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
          fill: ${({ theme }) => theme.FONT_C};
          margin-right: 7px;
        }

        & > a {
          display: flex;

          .envelope-icon {
            width: 13px;
            fill: ${({ theme }) => theme.FONT_C};
            margin-right: 7px;
          }
          .github-icon {
            width: 14px;
            fill: ${({ theme }) => theme.FONT_C};
            margin-right: 7px;
          }
          .instagram-icon {
            width: 13px;
            fill: ${({ theme }) => theme.FONT_C};
            margin-right: 7px;
          }
        }
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 300px;
      height: 130px;
    }

    & > div:nth-of-type(2) {
      width: 300px;
      height: 180px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    & > div:nth-of-type(1) {
      width: 230px;
      height: 130px;
      min-width: 230px;
      min-height: 130px;
      margin: 0 30px 0 0;
    }

    & > div:nth-of-type(2) {
      width: 250px;
      height: 200px;
      min-width: 250px;
      min-height: 200px;
      margin: 0 0 0 30px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    // border: 1px solid black;

    & > div:nth-of-type(1) {
      width: 250px;
      height: 130px;
    }
    & > div:nth-of-type(2) {
      width: 300px;
      height: 200px;
    }
  }
`;

DIV.AboutBlog = styled.div<AboutBlogProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  width: auto;
  min-height: 500px;
  margin: 160px 0 180px 0;
  position: relative;

  // AboutBlog 버튼 스타일
  & > div:nth-of-type(1) {
    // border: 2px solid ${({ theme }) => theme.BD_C};
    position: absolute;
    z-index: 1;
    flex-direction: row;
    justify-content: end;
    margin-top: 15px;

    & > button {
      border: 1px solid ${({ theme }) => theme.BD_C};
      margin: 5px;
      border-radius: 7px;
    }

    & > button:nth-of-type(1) {
      ${(props) => {
        if (props.isKorean) {
          return `
            background-color: ${props.theme.BG_C};
            color: ${props.theme.FONT_C};
          `;
        } else {
          return `
            background-color: ${props.theme.FONT_C};
            color: ${props.theme.BG_C};
          `;
        }
      }};
    }
    & > button:nth-of-type(2) {
      ${(props) => {
        if (!props.isKorean) {
          return `
            background-color: ${props.theme.BG_C};
            color: ${props.theme.FONT_C};
          `;
        } else {
          return `
            background-color: ${props.theme.FONT_C};
            color: ${props.theme.BG_C};
          `;
        }
      }};
    }
  }

  & > div {
    // border: 2px solid ${({ theme }) => theme.BD_C};
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 300px;
    max-width: 550px;
    width: 100%;
    padding: 0 30px;

    animation: active-language 0.25s ease-in-out 0s forwards;

    @keyframes active-language {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    & > p {
      // border: 1px solid black;
      word-break: keep-all;
      line-height: 2;

      ${(props) => {
        if (props.isKorean) {
          return `
            font-family: 'GangwonEdu_OTFBoldA';
            letter-spacing: 0.5px;
            font-size: 18px;
          `;
        } else {
          return `
            font-size: 16px;
            font-family: 'Sono', monospace;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            font-variation-settings: 'MONO' 1;
            letter-spacing: -0.5px;
            word-spacing: -3px;

            // 화면 너비에 따라 줄바꿈 가능하도록 변경
            & > span:nth-of-type(1) ~ span {
              // border: 1px solid black;
              display: block;
            }

            @media screen and (min-width: calc(${props.theme.BP.TABLET} - 270px)) {
              & > span:nth-of-type(1) ~ span {
                // border: 1px solid red; 
                display: inline;
              }
            }

          `;
        }
      }};

      // 인삿말
      & > span:nth-of-type(1) {
        // border: 1px solid black;
        display: inline-block;
        width: 100%;

        ${(props) => {
          if (props.isKorean) {
            return `
              font-family: 'MaplestoryOTFBold';
              font-size: 23px;
              letter-spacing: 3px;
              padding: 10px 0 15px 0;
            `;
          } else {
            return `
              font-family: 'Square Peg', cursive;
              font-weight: 600;
              font-size: 35px;
              letter-spacing: 3px;
            `;
          }
        }};
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    margin: 130px 0 160px 0;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    margin: 140px 0 180px 0;
    height: 550px;

    & > div {
      width: 650px;
      max-width: 650px;

      & > p {
        ${(props) => {
          if (props.isKorean) {
            return `
              font-size: 20px;
            `;
          } else {
            return `
              font-size: 18px;
            `;
          }
        }};
      }
    }
  }
`;

DIV.AboutMeDetail = styled.div`
  // border-top: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  font-size: 14px;

  & > div {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
  }

  & > div:nth-of-type(1) {
    margin: 0 0 100px 0;
    padding: 0 10px 10px 40px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > h3 {
      padding: 20px 0 0 10px;
    }
  }

  & > div:nth-of-type(2) {
    padding: 10px 10px 0 45px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > h3 {
      padding: 10px 0 10px 0;
    }

    & > ul {
      // border: 1px solid black;
      list-style-type: disc;
      margin: -10px 0 0 20px;
      font-size: 16px;

      & > li {
        margin: 15px 0px;
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: 70%;
      max-width: 700px;
    }
  }

  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 200px)) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    & > div:nth-of-type(1) {
      width: 400px;
      min-height: 130px;
      margin: 0 30px 0 0;
    }
    & > div:nth-of-type(2) {
      width: 350px;
      min-height: 130px;
      margin: 0 0 0 30px;
    }
  }
`;
