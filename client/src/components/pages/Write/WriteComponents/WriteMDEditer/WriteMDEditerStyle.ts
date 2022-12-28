import styled from '@_settings/styled';

export const StyledWriteMDEditer = styled.div`
  // border: 1px solid black;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > textarea {
    // border: 1px solid red;
    background-color: #eff1f3;
    border: none;
    padding-right: 20px;
    height: 85%;
    resize: none; //textarea 크기조절 막기
  }
`;
