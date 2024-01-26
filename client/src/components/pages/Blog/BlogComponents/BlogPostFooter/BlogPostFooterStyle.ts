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
  margin-bottom: 50px;

  & > div {
    // border: 1px solid red;
    font-size: 15px;
    color: ${({ theme }) => theme.FONT_C};
  }
`;

DIV.IntersectionTarget = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
`;

DIV.TargetMsg = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  color: ${({ theme }) => theme.FONT_C};
`;
