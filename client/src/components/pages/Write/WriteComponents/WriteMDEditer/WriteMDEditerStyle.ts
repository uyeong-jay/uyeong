import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.WriteMDEditerFrame = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > div {
    // border: 1px solid blue;
    width: 100%;
    height: 95%;

    & > textarea {
      // border: 1px solid red;
      width: 100%;
      height: 100%;
      padding-right: 20px;
      color: ${({ theme }) => theme.FONT_C_POST};

      overflow-y: scroll;
      overflow-x: hidden;

      ::-webkit-scrollbar {
        border-radius: 50%;
        width: 6px;

        @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
          width: 10px;
        }
      }
      ::-webkit-scrollbar-track {
        // border: 1px solid black;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.BD_C}CC;
        border-radius: 10px;
      }
    }
  }
`;
