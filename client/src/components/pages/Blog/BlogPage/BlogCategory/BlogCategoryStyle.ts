import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  width: 100%;
`;

DIV.Content = styled.div`
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 1000px;
  padding-top: 100px;

  //FORM
  & > form {
    // border: 1px solid black;
    border-bottom: 2px solid ${({ theme }) => theme.BD_C};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 300px;
    margin-bottom: 120px;

    @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
      width: 300px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      width: 400px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      width: 500px;
    }

    //INPUTBOX
    & > div {
      // border: 1px solid black;
      width: 100%;

      & > input {
        // border: 1px solid black;
        width: 100%;
      }
    }

    //BUTTON
    & > button {
      // border: 1px solid black;
      height: 40px;
    }

    //ERROR MSG
    & > p {
      // border: 1px solid red;
      position: absolute;
      bottom: -25px;
      left: 0;
      color: ${({ theme }) => theme.FONT_C_DANGER};
      font-weight: bold;
    }
  }

  //CATEGORY CARDS WRAPPER
  & > div {
    // border: 1px solid blue;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    justify-content: center;
    width: ${({ theme }) => theme.BP.MOBILE}; //MOBILE also
    margin-bottom: 100px;

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 200px)) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      width: 500px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      width: 800px;
    }
    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
      width: 1000px;
    }
  }
`;
