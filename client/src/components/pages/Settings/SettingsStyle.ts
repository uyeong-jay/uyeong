import styled from '@_settings/styled';

export const StyledSection = styled.section`
  border: 2px dotted lightslategray;
  width: 750px;
  border-radius: 20% 50% 30% / 30% 40% 40%;
  padding: 50px 150px 150px 150px;
  margin: 50px 0 50px 0;

  & > div {
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 60px;

    & .user_avatar_container {
      display: inline-flex;
      border: solid 5px rgba(0, 255, 0, 0.5);
    }

    & .user_avatar {
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
        cursor: pointer; //커서 넣기1
      }

      & input[type='file']::file-selector-button:hover {
        cursor: pointer; //커서 넣기2
      }
    }
  }

  & form {
    & > div:nth-of-type(odd) input {
      border-radius: 50px 80px 50px 80px;
    }
    & > div:nth-of-type(even) input {
      border-radius: 90px 55px 80px 50px;
    }
  }

  & p a {
    color: blue;
  }
`;
