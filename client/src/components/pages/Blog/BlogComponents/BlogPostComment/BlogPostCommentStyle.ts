import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid red;
  margin-bottom: 45px;
`;

DIV.ReplyGourp = styled.div`
  // border: 1px solid red;
  padding: 20px 5px 0 30px;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    padding: 20px 0 0 40px;
  }
`;
