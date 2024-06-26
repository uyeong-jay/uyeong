import styled from '@_settings/styled';

export const StyledWriteMDEditer = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > div {
    // border: 1px solid blue;
    width: 100%;
    height: 95%;

    & > textarea {
      // border: 1px solid red;
      width: 100%;
      height: 100%;
      padding-right: 20px;
      color: ${({ theme }) => theme.FONT_C_POST};
    }
  }
`;
