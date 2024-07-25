import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.WriteMDViewerFrame = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  padding: 30px;

  font-size: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 1.1rem;
  }
`;
