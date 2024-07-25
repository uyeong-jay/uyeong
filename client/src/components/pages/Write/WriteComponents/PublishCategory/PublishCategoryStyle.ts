import styled from '@_settings/styled';

interface PublishCategpryProps {
  isOpenedCategory: boolean;
}

interface OpenedCategoryProps {
  animationName: string;
}

interface CategoryListProps {
  isCategoryClicked: boolean;
}

export const DIV = {} as any;
export const LI = {} as any;

DIV.PublishCategory = styled.div<PublishCategpryProps>`
  // border: 1px solid black;
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 100px;

  & > div {
    // border: 1px solid blue;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    border-radius: 20px;
    color: ${({ theme }) => theme.FONT_C};
    letter-spacing: 0.3px;
    transition: height 0.5s ease-in-out;

    ${(props) => {
      if (props.isOpenedCategory) {
        return `
          height: 380px;
        `;
      } else {
        return `
          height: 100px;
        `;
      }
    }};

    //Select a category
    & > div:nth-of-type(1) {
      // border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;

      //합 50px 맞춤
      height: 35px;
      margin-top: 15px;

      & > span:first-of-type,
      span:last-of-type {
        // border: 1px solid blue;
        font-size: 20px;
        height: 100%;
        transform: translateY(1px);
      }

      & > span:not(:first-of-type):not(:last-of-type) {
        // border: 1px solid blue;
        display: block;
        max-width: 200px;
        margin: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        & .list-icon {
          // border: 1px solid black;
          display: inline-block;
          width: 13px;
          margin-right: 7px;
          transform: translateY(1.5px);
          fill: ${({ theme }) => theme.FONT_C};
        }
      }
    }

    & > button {
      // border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      border-radius: 20px;

      & .arrow-down-icon {
        // border: 1px solid black;
        width: 15px;
        height: 100%;
        opacity: 0.8;
        fill: ${({ theme }) => theme.FONT_C};
        transition: transform 0.25s ease-in-out;
        transform-origin: center center; //회전 중심점을 정중앙으로 지정

        ${(props) => {
          if (props.isOpenedCategory) {
            return `
              transform: translateY(5px) rotateX(180deg);
            `;
          } else {
            return `
              transform: translateY(-5px) rotateX(0deg);
            `;
          }
        }};
      }

      &:hover {
        & .arrow-down-icon {
          ${(props) => {
            if (props.isOpenedCategory) {
              return `
                transform: translateY(-5px) rotateX(180deg);
              `;
            } else {
              return `
                transform: translateY(5px) rotateX(0deg);
              `;
            }
          }};
        }
      }
    }
  }
`;

DIV.OpenedCategory = styled.div<OpenedCategoryProps>`
  // border: 1px solid red;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  width: 100%;
  margin-top: 20px;

  animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

  @keyframes down-category {
    from {
      opacity: 0;
      height: 0;
      pointer-events: none;
    }
    to {
      opacity: 1;
      height: 260px;
    }
  }

  @keyframes up-category {
    from {
      opacity: 1;
      height: 260px;
    }
    to {
      opacity: 0;
      height: 0;
      // overflow: hidden;
      pointer-events: none;
    }
  }

  & > ul {
    border: 2px solid ${({ theme }) => theme.BD_C}7F;
    height: 100%;
    width: 230px;
    border-radius: 10px;
    padding: 0 3px; //스크롤바 너비만큼 남겨놓기
    overflow: hidden; //하단 animation 보다 먼저 미리 넣어 두기

    //스크롤
    ${(props) => {
      if (props.animationName === 'down-category') {
        return `
          animation: show-scroll 0s ease-out 0.5s forwards;
          
          @keyframes show-scroll {
            from {
            }
            to {
              overflow-y: scroll;
              overflow-x: hidden;
              padding-right: 0; //스크롤바 너비만큼 제거하기
            }
          }
        `;
      } else {
        return `
          animation: hide-scroll 0s ease-out 0s forwards;

          @keyframes hide-scroll {
            from {
              overflow-y: scroll;
              overflow-x: hidden;
            }
            to {
            }
          }
        `;
      }
    }}

    ::-webkit-scrollbar {
      border-radius: 50%;
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      // border: 1px solid red;
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 20%;
    }
    ::-webkit-scrollbar-thumb {
      // border: 1px solid gray;
      background-color: ${({ theme }) => theme.BD_C}CC; //CC: opacity 80%
      border-radius: 10px;
    }
  }
`;

LI.CategoryList = styled.li<CategoryListProps>`
  // border: 1px solid black;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.BD_C}7F;
  margin: 30px 20px;
  padding: 0 20px 0 10px;
  cursor: pointer;

  & .check-icon {
    // border: 1px solid black;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    fill: ${({ theme }) => theme.FONT_C};
  }
`;
