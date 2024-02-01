import styled from '@_settings/styled';

export const DIV = {} as any;
export const FORM = {} as any;

DIV.SettingsTop = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 60px;

  & .settings-user-avatar-wrapper {
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: inline-flex;
  }

  & .settings-user-avatar {
    border-radius: 50%;
    object-fit: cover; //원본크기로 넣기
  }

  & > span {
    // border: 1px solid forestgreen;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 15px;
    width: 100px;
    height: 30px;
    border-radius: 10px;

    & .camera-icon {
      // border: 1px solid black;
      width: 15px;
      margin-right: 10px;
      fill: ${({ theme }) => theme.LOGO_C};
    }

    & > input {
      // border: 1px solid black;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer; //input 넓이에 커서 넣기
    }

    & input[type='file']::file-selector-button:hover {
      cursor: pointer; //input 파일선택 버튼에 커서 넣기
    }
  }
`;
FORM.SettingsMainForm = styled.form`
  width: 100%;
  max-width: 700px;

  & > h3 {
    // border: 1px solid red;
    margin: 80px 0 10px 0;
    font-size: 18px;
    letter-spacing: 0.5px;
  }

  & > div {
    // border: 1px solid red;
    position: relative;

    & > div {
      // border: 1px solid black;
      margin-bottom: 40px;

      & > input {
        // border: 1px solid black;
        background-color: ${({ theme }) => theme.LIGHT_BG_C};
        margin-top: 10px;
        border-radius: 10px;
      }
    }

    & > button {
      // border: 1px solid black;
      position: absolute;
      top: 37px;
      right: 10px;
    }
  }
`;

DIV.ErrMsg = styled.div`
  // border: 1px solid black;
  font-size: 14px;
  margin: 10px 0 0 5px;
  color: ${({ theme }) => theme.FONT_C_DANGER};
`;

DIV.SuccessMsg = styled.div`
  // border: 1px solid black;
  font-size: 14px;
  margin: 10px 0 0 5px;
  color: ${({ theme }) => theme.FONT_C_UPDATE};
`;
