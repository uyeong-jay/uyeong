import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const ASIDE = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

DIV.BlogBlock = styled.div`
  border-left: 2px solid ${({ theme }) => theme.BD_C};
  border-right: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  // height: 100%;
  // padding: 50px 25px 100px 25px;
  margin-top: 70px;
`;

ASIDE.BlogTags = styled.aside`
  // border: 1px solid black;
  width: 200px;
  padding: 50px 0;

  & > .tags-wrapper {
    // border: 1px solid black;
    width: 100%;
    height: 100%;
    padding: 20px 40px;

    & > div {
      pointer: cursor;
      // border: 1px solid black;
    }
  }
`;

SECTION.BlogMain = styled.section`
  border-left: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 700px;
  padding: 50px 0;
`;
