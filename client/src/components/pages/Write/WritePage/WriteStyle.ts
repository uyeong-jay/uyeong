import styled from '@_settings/styled';

export const StyledWrite = styled.div`
  // border: 1px solid red;
  background-color: white;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > .write-right-group {
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 0 0 0 25px;
  }

  & > .write-left-group {
    // border: 1px solid green;
    width: 50%;
  }
`;
