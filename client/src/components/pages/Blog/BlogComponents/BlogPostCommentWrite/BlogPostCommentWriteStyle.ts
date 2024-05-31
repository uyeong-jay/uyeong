import styled from '@_settings/styled';

interface CommentLoginBoxProps {
  animationName: string;
}

export const FORM = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;

FORM.CommentWriteForm = styled.form`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  & > div:nth-of-type(1) {
    // border: 1px solid blue;
    position: relative;
    margin-top: 10px;
    width: 100%;

    & > textarea {
      // border: 1px solid blue;
      border: none;
      background-color: ${({ theme }) => theme.LIGHT_BG_C};
      width: 100%;
      height: 150px;
      padding: 15px;
      border-radius: 10px;
      overflow: hidden;
      resize: none;
      font-size: 11px;

      @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
        font-size: 13px;
      }
      @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
        font-size: 17px;
      }

      &::placeholder {
        color: ${({ theme }) => theme.FONT_C};
        opacity: 0.6;
      }
    }
  }
`;

DIV.CommentLoginBox = styled.div<CommentLoginBoxProps>`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.BG_C}7F; //7F: opacity 0.5
  border-radius: 10px;
  backdrop-filter: blur(5px);
  color: ${({ theme }) => theme.FONT_C}CC; //CC: opacity 0.8
  font-size: 15px;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 17px;
  }

  animation: ${(props) => props.animationName} 0.4s ease-out 0s forwards;

  @keyframes up {
    from {
      top: -50px;
    }
    to {
      top: 0;
    }
  }

  & > a {
    border: 2px solid ${({ theme }) => theme.BD_C};
    width: 100px;
    margin-top: 10px;
    text-align: center;
    color: ${({ theme }) => theme.FONT_C};
    opacity: 0.8;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.FONT_C}7F; //7F: opacity 0.5
    }

    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      width: 120px;
    }
  }
`;

DIV.ReplyBtnGroup = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: end;
  margin: 10px 0;
`;

BTN.ReplyCancelBtn = styled.button`
  // border: 1px solid green;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 10px;
  margin-right: 5px;
`;

BTN.ReplyBtn = styled.button`
  // border: 1px solid green;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 10px;
`;

DIV.EditBtnGroup = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: end;
  margin: 10px 0;
  font-size: 8px;

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 10px;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 14px;
  }
`;

BTN.EditCancelBtn = styled.button`
  // border: 1px solid green;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 10px;
  margin-right: 5px;
`;

BTN.EditSaveBtn = styled.button`
  // border: 1px solid green;
  color: ${({ theme }) => theme.FONT_C};
  padding: 0 10px;
`;

BTN.CommentBtn = styled.button`
  // border: 1px solid green;
  align-self: end;
  margin: 10px 0;
  font-size: 15px;
  color: ${({ theme }) => theme.FONT_C};
`;
