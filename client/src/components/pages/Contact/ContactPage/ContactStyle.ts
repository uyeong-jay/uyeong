import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.Layout = styled.div`
  border: 1px solid black;

  & > form {
    border: 1px solid black;

    & > textarea {
      border: 1px solid green;
      width: 100%;
      resize: none; //textarea 크기조절 막기
      height: 150px;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 8px;
    }
  }
`;
