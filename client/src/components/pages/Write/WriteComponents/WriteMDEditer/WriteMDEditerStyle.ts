import styled from '@_settings/styled';

export const StyledWriteMDEditer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > textarea {
    border: 1px solid red;
    height: 70%;
  }
`;
