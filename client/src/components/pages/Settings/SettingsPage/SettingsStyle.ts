import styled from '@_settings/styled';

export const StyledSttings = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  // border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 50px 150px 150px 150px;
  margin: 50px 0 50px 0;

  //프로필 사진
  & > div {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 60px;

    & .user-avatar-wrapper {
      //border: 1px solid black;
      display: inline-flex;
      border: solid 5px rgba(0, 255, 0, 0.5);
    }

    & .user-avatar {
      border-radius: 50%;
      object-fit: cover; //원본크기로 넣기
    }

    & > span {
      border: 1px solid forestgreen;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 15px;
      width: 120px;
      height: 35px;
      background-color: rgba(0, 255, 0, 0.3); //greenyellow

      & .fa-camera,
      p {
        padding: 5px;
      }

      & > input {
        position: absolute;
        border: 1px solid black;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer; //input 넓이에 커서 넣기
      }

      & input[type='file']::file-selector-button:hover {
        cursor: pointer; //input 파일선택 버튼에 커서 넣기
      }
    }
  }

  //프로필 폼
  & form {
    //비번 Show 버튼
    & > div {
      position: relative;

      & > button {
        // border: 1px solid black;
        position: absolute;
        top: 35px;
        right: 10px;
        // z-index: 1;
      }
    }

    & > div:nth-of-type(odd) input {
      // border-radius: 50px 80px 50px 80px;
    }
    & > div:nth-of-type(even) input {
      // border-radius: 90px 55px 80px 50px;
    }
  }

  & p a {
    color: blue;
  }
`;
