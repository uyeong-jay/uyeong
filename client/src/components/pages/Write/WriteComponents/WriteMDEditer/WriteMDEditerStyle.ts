import styled from '@_settings/styled';

export const StyledWriteMDEditer = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > textarea {
    // border: 1px solid red;
    background-color: ${({ theme }) => theme.BG_C};
    border: none;
    padding-right: 20px;
    height: 95%;
    resize: none; //textarea 크기조절 막기
  }
`;
