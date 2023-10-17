import styled from '@_settings/styled';

interface HeaderBlockProps {
  routerPathname: string;
}

export const HEADER = {} as any;
export const DIV = {} as any;
export const NAV = {} as any;

HEADER.Frame = styled.header`
  // border: 1px solid green;
  // background-color: ${({ theme }) => theme.HEADER_BG_C};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 250px;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.FONT_C};
`;

DIV.HeaderBlock = styled.div<HeaderBlockProps>`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: ${({ theme }) => theme.BP.TABLET};

  & > ul {
    border-bottom: 1px solid ${({ theme }) => theme.BD_C};
    display: flex;
    justify-contents: center;
    align-items: center;
    position: relative;
    width: 100%;
    padding-left: 5%;

    & > li:nth-of-type(1) {
      border-right: 1px solid ${({ theme }) => theme.BD_C};
      padding: 10px 15px 10px 0px;

      & > span {
        padding: 5px 10px 6px 10px;
        ${(props) => {
          if (props.routerPathname === '/blog')
            return `
              background-color: ${props.theme.FONT_C};
              color: ${props.theme.BG_C};
            `;
        }}
      }
    }

    & > li:nth-of-type(2) {
      border-left: 1px solid ${({ theme }) => theme.BD_C};
      padding: 10px 0px 10px 15px;

      & > span {
        padding: 5px 10px 6px 10px;
        ${(props) => {
          if (props.routerPathname === '/blog/category')
            return `
              background-color: ${props.theme.FONT_C};
              color: ${props.theme.BG_C};
            `;
        }}
      }
    }

    & > li {
      // border: 1px solid black;
      position: relative;
      bottom: -30px;
      left: 0;
      height: 70px;

      & > span {
        // border: 1px solid black;
        cursor: pointer;
        border-radius: 20px;
        font-weight: 600;
      }

      
    }
  }

  & > div {
    border-top: 1px solid ${({ theme }) => theme.BD_C};
    width: 100%;
    display: flex;
    justify-content: flex-end;

    & > span {
      // border: 1px solid black;
      margin: 5px 25px 5px 5px;
      font-family: 'Square Peg', cursive;
      font-size: 25px;
      font-weight: 600;


      ${(props) => {
        if (props.routerPathname === '/blog/category')
          return `
            animation: flipHalf 0.5s linear forwards;

            @keyframes flipHalf {
              0% {
                transform: perspective(400px) rotateY(0deg);
              }
              100% {
                transform: perspective(400px) rotateY(180deg);
              }
            }
          `;
        if (props.routerPathname === '/blog')
          return `
            animation: flipHalfToFull 0.5s linear forwards;

            @keyframes flipHalfToFull {
              0% {
                transform: perspective(400px) rotateY(180deg);
              }
              100% {
                transform: perspective(400px) rotateY(0deg);
              }
            }
          `;
      }}

      

      
  
  }
`;
