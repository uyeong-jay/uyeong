import styled from '@_settings/styled';

interface HeaderNavProps {
  isMenuIconClicked: boolean;
  animationName: string;
  render: boolean;
}

export const HEADER = {} as any;
export const NAV = {} as any;

HEADER.Layout = styled.header`
  // border: 1px solid yellow;
  background-color: transparent;
  // backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: blur(20px);
  position: sticky; //banner에 그림을 넣을수도 있어서 sticky로 설정
  top: 0;
  z-index: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.BP.PC};
  margin: 0 auto;
  height: 50px;
`;

NAV.HeaderNav = styled.nav<HeaderNavProps>`
  // border: 1px solid green;
  height: 100%;

  & > ul {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    & > li:nth-of-type(1) {
      // border: 1px solid black;
      max-width: 25px;
      max-height: 40px;
      margin-left: 17px;

      & .logo {
        fill: #2c3333;
      }
    }

    & > li:nth-of-type(2) {
      // border: 1px solid black;
      width: 50%;

      & > div {
        // border: 1px solid red;
        width: 100%;

        & > ul {
          // border: 1px solid yellow;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }
      }
    }

    & > li:nth-of-type(3) {
      // border: 1px solid black;
      position: relative;
      display: flex;
      // justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 40px;
      height: 30px;
      margin-right: 25px;

      & .header-user-avatar-wrapper {
        // border: 2px solid #555555;
        display: inline-flex;
        width: 30px;
      }

      & .header-user-avatar {
        border-radius: 50%;
        object-fit: cover; //원본크기로 넣기
      }

      & .caret-down-icon {
        // border: 1px solid black;
        width: 10px;
        margin-left: 5px;
        fill: #555555;
      }

      & .caret-up-icon {
        // border: 1px solid black;
        width: 10px;
        margin-left: 5px;
        fill: #555555;
      }

      & > ul {
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        right: -5px;
        width: 130px;
        height: 200px;
        border-radius: 10px;
        background-color: white;

        & > li {
          width: 100%;
          height: 100%;

          & > button,
          a {
            // border: 1px solid black;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 7px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }

    & > li:nth-of-type(4) {
      // border: 1px solid black;
      width: 50px;
      display: none;

      .list-bar-icon {
        // border: 1px solid black;
        width: 20px;
      }
    }

    // max 이하일때 적용
    @media screen and (max-width: 833px) {
      & > li:nth-of-type(2) {
        // border: 1px solid yellow;
        width: 80%;

        & > div {
          // border: 1px solid red;
          background-color: white;
          display: flex;
          align-items: flex-end;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;

          ${(props) => {
            if (props.render && props.isMenuIconClicked) {
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
            } else if (props.render && !props.isMenuIconClicked) {
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
            height: 85%;

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
                // letter-spacing: 0.01em;
              }

              ${(props) => {
                if (props.render && !props.isMenuIconClicked) {
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

      & > li:nth-of-type(3) {
        // border: 1px solid black;
        margin-right: 10px;
      }

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
            border: 1px solid #555555;
            background-color: #555555;
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
