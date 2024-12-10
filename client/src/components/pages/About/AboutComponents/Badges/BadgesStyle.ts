import styled from '@_settings/styled';

export const DIV = {} as any;

interface BadgesProps {
  isAllBadgesActive: boolean;
}

DIV.Frame = styled.div<BadgesProps>`
  // border: 1px solid black;
  padding: 0 10px 10px 10px;

  & > button {
    border: 2px solid ${({ theme }) => theme.BD_C};
    position: absolute;
    top: -25px;
    height: 15px;
    width: 20px;
    padding: 0; //모바일 환경에서 width가 더 작게 조절되도록 padding 제거
    border-radius: 25%;
  }

  & > button:nth-of-type(1) {
    background-color: ${(props) => {
      if (!props.isAllBadgesActive) return `${props.theme.BD_C};`;
      else return `${props.theme.BG_C};`;
    }};
    right: 52px;
  }

  & > button:nth-of-type(2) {
    background-color: ${(props) => {
      if (props.isAllBadgesActive) return `${props.theme.BD_C};`;
      else return `${props.theme.BG_C};`;
    }};
    right: 20px;
  }

  & > div {
    // border: 1px solid black;
    // margin-bottom: 1px;

    & > p {
      // border: 1px solid red;
      padding-top: 15px;
      padding-bottom: 5px;
    }

    & > ul {
      // border: 1px solid black;

      & > li {
        // border: 1px solid black;
        display: flex;
        flex-wrap: wrap;

        & > div {
          // border: 1px solid black;
          margin: 5px 10px 5px 0;
          cursor: pointer;

          & > span {
            border: 1px solid ${({ theme }) => theme.BD_C};
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
`;
