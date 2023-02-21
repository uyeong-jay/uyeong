import styled from '@_settings/styled';

const Layout = styled.section`
  border: 1px solid green;
  width: 100%;
  // height: 300px;
`;

const CommentTypeBtnGroup = styled.div`
  border: 1px solid green;
`;

const CommonCommentBtn = styled.button`
  border: 1px solid green;
`;

const IssueCommentBtn = styled.button`
  border: 1px solid green;
`;

const CommonCommentBlock = styled.div`
  border: 1px solid green;
  width: 100%;

  & > div {
    border: 1px solid green;
  }
`;

const CommentMDviewerGroup = styled.div`
  border: 1px solid green;
`;

export const SECTION = {
  Layout,
};

export const DIV = {
  CommentTypeBtnGroup,
  CommonCommentBlock,
  CommentMDviewerGroup,
};

export const BTN = {
  CommonCommentBtn,
  IssueCommentBtn,
};
