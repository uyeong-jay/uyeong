import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.Layout = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 25px 100px 25px;

  & > h1 {
    // border: 1px solid black;
    margin-bottom: 30px;
  }

  & > form {
    // border: 1px solid black;
    max-width: 700px;
    width: 100%;
    color: darkslategray;

    & > textarea {
      border: none;
      width: 100%;
      resize: none; //textarea 크기조절 막기
      height: 150px;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 8px;
      color: darkslategray;
    }

    & > button {
      // border: 1px solid black;
      float: right;
      padding-right: 5px;
      color: darkslategray;
    }

    & > span {
      // border: 1px solid black;
      float: right;
      padding-right: 5px;
      color: darkslategray;
      cursor: wait;
    }
  }
`;

// DIV.SuccessMsg = styled.div`
//   // border: 1px solid black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   padding: 20px 0;
// `;
