import styled from '@_settings/styled';

interface HeaderFrameProps {
  scrollDirection: string;
}

interface HeaderNavProps {
  isMenuIconClicked: boolean;
  isShowingMenuAni: boolean;
}

export const HEADER = {} as any;
export const NAV = {} as any;

HEADER.Frame = styled.header<HeaderFrameProps>`
  // border: 1px solid red;
  background-color: transparent;
  // backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky; //banner에 그림을 넣을수도 있어서 sticky로 설정
  top: 0;
  z-index: 2; //modal 다음으로 높은 레벨
  width: 100%;
  height: 65px;

  //스크롤시 header 애니메이션
  ${(props) => {
    if (props.scrollDirection === 'up') {
      return `
          animation: up-header 0.2s ease-out 0s forwards;
          @keyframes up-header {
            from {
              transform: translateY(-100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `;
    } else if (props.scrollDirection === 'down') {
      return `
        animation: down-header 0.2s ease-out 0s forwards;
        @keyframes down-header {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `;
    } else {
      return `transform: translateY(0);`;
    }
  }};
`;

NAV.HeaderNav = styled.nav<HeaderNavProps>`
  // border: 1px solid green;
  position: relative;
  max-width: ${({ theme }) => theme.BP.PC};
  width: 100%;
  height: 100%;

  & > ul {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 5px;

    // 블로그 로고(1)
    & > li:nth-of-type(1) {
      // border: 1px solid black;
      max-width: 25px;
      max-height: 40px;
      margin-left: 10px;
      margin-top: 5px;

      & .logo {
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }

    // 헤더 메뉴(2)
    & > li:nth-of-type(2) {
      // border: 1px solid black;
      width: 50%;

      & > div {
        // border: 1px solid red;
        width: 100%;

        & > ul {
          // border: 1px solid red;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          font-weight: bold;
        }
      }
    }

    // 프로필(3)
    & > li:nth-of-type(3) {
      // border: 1px solid black;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 50px;
      height: 30px;
      white-space: nowrap;
      margin-right: 50px;

      & .header-user-avatar-wrapper {
        // border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;

        & .user-icon {
          // border: 1px solid red;
          width: 17px;
          fill: ${({ theme }) => theme.BD_C}B2; //B2: opacity 0.7
        }
      }

      & .header-user-avatar {
        // border: 1px solid blue;
        border-radius: 50%;
        object-fit: cover; //원본크기로 넣기
      }

      & .caret-down-icon {
        // border: 1px solid black;
        width: 10px;
        margin-left: 5px;
        fill: ${({ theme }) => theme.BD_C};
      }

      & .caret-up-icon {
        // border: 1px solid black;
        width: 10px;
        margin-left: 5px;
        fill: ${({ theme }) => theme.BD_C};
      }

      & > ul {
        // border: 1px solid red;
        background-color: ${({ theme }) => theme.LIGHT_BG_C};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 40px;
        right: -5px;
        width: 130px;
        border-radius: 10px;

        & > li {
          // border: 1px solid red;
          width: 100%;
          height: 60px;
          position: relative;

          & > button,
          a {
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 15px;
            width: 100%;
            height: 100%;
            color: ${({ theme }) => theme.FONT_C};
            font-weight: bold;
          }
        }

        & > span {
          border-bottom: 1px solid ${({ theme }) => theme.BD_C};
          width: 75%;
        }
      }
    }

    // 헤더 메뉴 아이콘(4)
    & > li:nth-of-type(4) {
      // border: 1px solid black;
      width: 50px;
      display: none;

      .list-bar-icon {
        // border: 1px solid black;
        width: 20px;
      }
    }

    // -------------- 아래 부터는 width 833px 이하일때 적용 --------------

    @media screen and (max-width: 833px) {
      // 헤더 메뉴(2)
      & > li:nth-of-type(2) {
        // border: 1px solid yellow;
        width: 80%;

        & > div {
          // border: 1px solid red;
          background-color: ${({ theme }) => theme.HEADER_BG_C};
          box-shadow: ${({ theme }) => theme.HEADER_SHADOW};
          display: flex;
          align-items: flex-end;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          color: ${({ theme }) => theme.FONT_C};

          ${(props) => {
            if (props.isShowingMenuAni && props.isMenuIconClicked) {
              return `
                animation: down-list-bar 0.5s ease-out 0s forwards;
                @keyframes down-list-bar {
                  from {
                    height: 0;
                  }
                  to {
                    height: 70vh;
                  }
                }
  
              `;
            } else if (props.isShowingMenuAni && !props.isMenuIconClicked) {
              return `
                animation: up-list-bar 0.4s ease-out 0s forwards;
                @keyframes up-list-bar {
                  from {
                    height: 70vh;
                    pointer-events: none;
                  }
                  to {
                    opacity: 0;
                    pointer-events: none;
                    height: 0;
                  }
                }
              `;
            } else {
              return `
                height: 0;
                opacity: 0;
                pointer-events: none;
              `;
            }
          }}

          & > ul {
            // border: 1px solid black;
            display: flex;
            flex-direction: column;
            height: 100%;

            & > li {
              // border: 1px solid black;
              width: 100%;
              height: 100%;

              & > a {
                // border: 1px solid blue;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-size: 25px;
                font-weight: 600;
              }

              ${(props) => {
                if (props.isShowingMenuAni && !props.isMenuIconClicked) {
                  return `
                    animation: bar-font-color 0.1s ease-out 0s forwards;
                    @keyframes bar-font-color {
                      from {
                        pointer-events: none;
                      }
                      to {
                        opacity: 0;
                        pointer-events: none;
                      }
                    }
                  `;
                }
              }}
            }
          }
        }
      }

      // 프로필(3)
      & > li:nth-of-type(3) {
        // border: 1px solid black;
        margin-right: 10px;
      }

      // 헤더 메뉴 아이콘(4)
      & > li:nth-of-type(4) {
        // border: 1px solid black;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        cursor: pointer;
        width: 45px;
        height: 45px;
        margin-right: 15px;

        & > div {
          // border: 1px solid black;
          width: 18px;
          height: 18px;
          position: relative;

          & span {
            border: 1px solid ${({ theme }) => theme.BD_C};
            background-color: ${({ theme }) => theme.BD_C};
            display: block;
            width: 100%;
            height: 2px;
            position: absolute;
            border-radius: 10px;
            transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

            &:first-of-type {
              top: 4px;
            }
            &:last-of-type {
              bottom: 4px;
            }
          }

          ${(props) => {
            if (props.isMenuIconClicked) {
              return `
                & span {
                  &:first-of-type {
                    transform: rotate(45deg);
                    top: 8px;
                  }
                  &:last-of-type {
                    transform: rotate(-45deg);
                    bottom: 8px;
                  }
                }
              `;
            }
          }}
        }
      }
    }
  }
`;
