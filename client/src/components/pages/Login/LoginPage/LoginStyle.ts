import styled from '@_settings/styled';

export const FORM = {} as any;
export const H1 = {} as any;
export const P = {} as any;

FORM.LoginForm = styled.form`
  // border: 1px solid black;
  max-width: 700px;
  width: 100%;

  & > div {
    // border: 1px solid red;
    position: relative;

    & > div {
      // border: 1px solid black;
      margin-bottom: 40px;

      & > input {
        // border: 1px solid black;
        background-color: ${({ theme }) => theme.INITIAL_BG_C};
        margin-top: 10px;
        border-radius: 10px;
      }
    }

    & > button {
      // border: 1px solid black;
      position: absolute;
      top: 37px;
      right: 10px;
    }
  }
`;
P.LoginFooter = styled.p`
  // border: 1px solid black;
  margin-top: 5px;
  max-width: 700px;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.FONT_C};

  & > a {
    font-weight: bold;
    color: ${({ theme }) => theme.FONT_C};
  }
`;
