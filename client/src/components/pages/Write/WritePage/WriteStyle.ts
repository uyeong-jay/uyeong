import styled from '@_settings/styled';

export const StyledWrite = styled.div`
  // border: 1px solid red;
  background-color: white;
  display: flex;
  // flex-direction: column-reverse;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // overflow-style: none;
  // overflow: hidden;
  // scrollbar: none;

  // &::-webkit-scrollbar {
  //   display: none;
  // }

  // & .write-group {
  //   scrollbar-width: none;
  //   -ms-overflow-style: none;
  // }

  // & > .write-group::-webkit-scrollbar {
  //   display: none;
  // }

  & > .write-right-group {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;
