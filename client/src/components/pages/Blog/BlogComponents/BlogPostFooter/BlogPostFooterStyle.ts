import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid green;
  width: 100%;
`;

DIV.CommentWriteBlock = styled.div`
  // border: 1px solid green;
  width: 100%;

  & > div {
    // border: 1px solid red;
    font-size: 15px;
    color: ${({ theme }) => theme.FONT_C};
  }
`;

DIV.CommentMdViewerGroup = styled.div`
  // border: 1px solid blue;
`;
