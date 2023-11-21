import styled from '@_settings/styled';

export const FORM = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;

FORM.CommentWriteForm = styled.form`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 50px;

  & > textarea {
    // border: 1px solid green;
    border: none;
    background-color: #fffcf6;
    width: 100%;
    height: 150px;
    margin-top: 10px;
    padding: 15px 20px;
    border-radius: 10px;
    overflow: hidden;
    resize: none; //textarea 크기조절 막기
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

  & > button {
    // border: 1px solid green;
    display: flex;
    justify-content: end;
    alin-itwms: center;
    width: 100px;
    padding-bottom: 10px;
    font-size: 15px;
    color: ${({ theme }) => theme.FONT_C};
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
  width: 100px;
  align-self: end;
  margin-top: 10px;
`;
