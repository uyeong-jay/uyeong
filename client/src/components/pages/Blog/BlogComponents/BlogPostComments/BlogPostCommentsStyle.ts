import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid green;
  width: 100%;
  // height: 300px;
`;

DIV.CommonCommentBlock = styled.div`
  border: 1px solid green;
  width: 100%;

  & > div {
    // border: 1px solid green;
  }
`;

DIV.CommentMDviewerGroup = styled.div`
  // border: 1px solid green;
`;
