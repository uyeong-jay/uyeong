import styled from '@_settings/styled';

export const StyledPublishPreview = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  width: 100%;
  height: 100%;

  & .post-thumbnail-wrapper {
    // border: 1px solid black;
    width: 350px;
    height: 200px;
    margin: 40px 30px;
  }

  // & > .post-thumbnail-wrapper:hover {
  //   background-color: #b8c1ca;
  // }

  & .post-thumbnail-wrapper-with-image {
    // border: 1px solid black;
    display: inline-flex;
    flex-direction: column;
    position: relative;
    margin: 40px 30px;
    background-color: #eff1f3;

    & > input {
      // border: 1px solid black;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer; //input 넓이에 커서 넣기
    }

    & > input[type='file']::file-selector-button:hover {
      cursor: pointer; //input 파일선택 버튼에 커서 넣기
    }

    & > .fa-camera,
    button {
      position: absolute;
    }

    & > .fa-camera {
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      // color: red;
      opacity: 0.5;
    }

    & > button {
      // border: 1px solid black;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(0, 0, 0, 0.5);
    }
  }

  & .post-thumbnail {
    border-radius: 15px;
    object-fit: cover; //원본크기로 넣기
    z-index: 1;
  }

  & > textarea {
    margin: 0 auto;
    width: 333px;
    height: 150px;
    background-color: #eff1f3;
    border: none;
    resize: none;
    border-radius: 15px;
    padding: 15px;
    // text-indent: 5%;
  }

  & > small {
    // border: 1px solid black;
    width: 333px;
    margin: 0 auto;
    text-align: end;
    padding-right: 10px;
    padding-top: 5px;
    opacity: 0.7;
  }
`;
