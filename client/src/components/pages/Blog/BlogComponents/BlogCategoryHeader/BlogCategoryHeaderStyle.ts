import styled from '@_settings/styled';

export const FORM = {} as any;

FORM.CategoryNameFrom = styled.form`
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
    top: 45px;
    left: 0;
    color: ${({ theme }) => theme.FONT_C_DANGER};
    font-weight: bold;
  }
`;
