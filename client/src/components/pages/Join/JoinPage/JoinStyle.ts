import styled from '@_settings/styled';

export const FORM = {} as any;
export const DIV = {} as any;
export const P = {} as any;

DIV.JoinSuccess = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    margin-top: 100px;

    & > h1 {
      // border: 1px solid black;
    }

    & > svg {
      // border: 1px solid black;
      margin-left: 10px;
      transform: translate(2px, -5px);
      width: 60px;
      height: 50px;
    }
  }
  & > p {
    // border: 1px solid black;
    min-width: 315px;
    margin: 20px 0;
    text-align: center;
    font-size: 15px;
    letter-spacing: 0.3px;
  }
  & > a {
    border: 2px solid ${({ theme }) => theme.FONT_C};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 30px;
    margin-top: 20px;
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.FONT_C};
  }
`;

FORM.JoinForm = styled.form`
  width: 100%;
  max-width: 700px;

  & > h3 {
    // border: 1px solid red;
    margin: 80px 0 10px 0;
    font-size: 18px;
    letter-spacing: 0.5px;
  }

  & > div {
    // border: 1px solid red;
    position: relative;

    & > div {
      // border: 1px solid black;
      margin-bottom: 40px;

      & > input {
        // border: 1px solid black;
        background-color: ${({ theme }) => theme.LIGHT_BG_C};
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

P.JoinFooter = styled.p`
  // border: 1px solid black;
  margin-top: 13px;
  max-width: 700px;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.FONT_C};

  & > a {
    font-weight: bold;
    color: ${({ theme }) => theme.FONT_C};
  }
`;
