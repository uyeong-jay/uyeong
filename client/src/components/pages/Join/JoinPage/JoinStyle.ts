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
      letter-spacing: 7px;

      @media screen and (max-width: ${({ theme }) => theme.BP.TABLET}) {
        letter-spacing: 3px;
      }
    }

    & > .party-popper-icon {
      // border: 1px solid black;
      margin-left: 10px;
      transform: rotate(-7deg) translate(-8px, 0px);
      width: 60px;
      height: 50px;
    }
    & > .party-popper-icon:nth-of-type(2) {
      // border: 1px solid black;
      transform: rotate(-85deg) translate(0px, -8px);
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
    width: 100%;
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

  //마지막 form btn 제외
  & > div:not(:last-of-type) {
    // border: 1px solid red;
    position: relative;
    margin-bottom: 40px;

    & > div {
      // border: 1px solid black;
      position: relative;

      & > input {
        // border: 1px solid black;
        background-color: ${({ theme }) => theme.LIGHT_BG_C};
        margin-top: 10px;
        border-radius: 10px;
      }

      &.count-down-timer {
        // border: 1px solid red;
        position: absolute;
        top: 20px;
        right: 75px;
        font-weight: bold;
      }
    }

    & > span,
    button {
      // border: 1px solid black;
      position: absolute;
      border-radius: 10px;
      height: 40px;
      top: 31px;
      right: 5px;
    }

    //loader
    & > span {
      background-color: ${({ theme }) => theme.BG_C};
      border: 5px solid ${({ theme }) => theme.LIGHT_BG_C};
      display: flex;
      justify-content: center;
      align-items: center;
      right: -5px;
      width: 110px;
    }

    & > .verify-email-btn,
    .verify-code-btn {
      border: 5px solid ${({ theme }) => theme.LIGHT_BG_C};
      background-color: ${({ theme }) => theme.BG_C};
      right: 0px;
      color: ${({ theme }) => theme.FONT_C}D8; //opacity: 85%
      font-weight: bold;

      &:disabled {
        color: ${({ theme }) => theme.FONT_C}66; //opacity: 40%
        cursor: default;
      }
    }

    //responsive
    & > span,
    .verify-email-btn {
      width: 110px;

      @media screen and (max-width: ${({ theme }) => theme.BP.TABLET}) {
        position: relative;
        top: 10px;
        left: 0;
        width: 100%;
      }
    }

    & > .verify-code-btn {
      padding: 0 10px;
      top: 10px;
    }
  }

  & > .verify-code-input {
    // border: 1px solid black;
    margin-top: -40px;

    @media screen and (max-width: ${({ theme }) => theme.BP.TABLET}) {
      margin-top: -30px;
    }
  }
`;

DIV.EmailErrMsg = styled.div`
  // border: 1px solid black;
  position: relative;
  top: -5px;
  left: 0;
  font-size: 14px;
  margin: 10px 0 0 5px;
  color: ${({ theme }) => theme.FONT_C_DANGER};

  @media screen and (max-width: ${({ theme }) => theme.BP.TABLET}) {
    top: 5px;

    &.verify-code-err {
      top: -2px;
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
