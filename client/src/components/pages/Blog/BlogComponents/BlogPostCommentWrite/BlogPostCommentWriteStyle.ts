import styled from '@_settings/styled';

const CommentWriteForm = styled.form`
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

const ReplyBtnGroup = styled.div`
  border: 1px solid green;
  display: flex;
  justify-content: end;
`;

const ReplyBtn = styled.button`
  border: 1px solid green;
`;

const CancelBtn = styled.button`
  border: 1px solid green;
`;

const CommentBtn = styled.button`
  border: 1px solid green;
  width: 100px;
  align-self: end;
  margin-top: 10px;
`;

export const FORM = {
  CommentWriteForm,
};

export const DIV = {
  ReplyBtnGroup,
};

export const BTN = {
  ReplyBtn,
  CancelBtn,
  CommentBtn,
};
