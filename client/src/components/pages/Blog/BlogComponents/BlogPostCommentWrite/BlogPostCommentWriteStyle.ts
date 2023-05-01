import styled from '@_settings/styled';

export const FORM = {} as any;

export const DIV = {} as any;

export const BTN = {} as any;

FORM.CommentWriteForm = styled.form`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  height: 100%;

  & > textarea {
    border: 1px solid green;
    width: 100%;
    resize: none; //textarea 크기조절 막기
    height: 150px;
    overflow: hidden;
    margin: 10px 0;
    padding: 15px 8px;
  }

  & > button {
    border: 1px solid green;
    width: 100px;
    align-self: end;
    margin-top: 10px;
  }
`;

DIV.ReplyBtnGroup = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: end;
`;

BTN.ReplyBtn = styled.button`
  border: 1px solid green;
`;

BTN.CancelBtn = styled.button`
  border: 1px solid green;
`;

BTN.CommentBtn = styled.button`
  border: 1px solid green;
  width: 100px;
  align-self: end;
  margin-top: 10px;
`;
