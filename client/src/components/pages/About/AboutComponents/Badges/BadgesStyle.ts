import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.Layout = styled.div`
  // border: 1px solid black;
  padding: 0 10px 10px 10px;
  // min-width: 100%;

  & > div {
    // border: 1px solid black;

    & > p {
      // border: 1px solid red;
      padding-top: 10px;
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
          margin-right: 10px;

          & > img {
          }
        }
      }
    }
  }
`;
