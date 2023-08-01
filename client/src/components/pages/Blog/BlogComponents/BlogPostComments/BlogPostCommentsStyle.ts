import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;

SECTION.Frame = styled.section`
  border: 1px solid green;
  width: 100%;
  // height: 300px;
`;

DIV.CommentTypeBtnGroup = styled.div`
  border: 1px solid green;
`;

BTN.CommonCommentBtn = styled.button`
  border: 1px solid green;
`;

BTN.IssueCommentBtn = styled.button`
  border: 1px solid green;
`;

DIV.CommonCommentBlock = styled.div`
  border: 1px solid green;
  width: 100%;

  & > div {
    border: 1px solid green;
  }
`;

DIV.CommentMDviewerGroup = styled.div`
  border: 1px solid green;
`;
