import styled from '@_settings/styled';

export const StyledWriteMDViewer = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  padding: 30px;
`;
