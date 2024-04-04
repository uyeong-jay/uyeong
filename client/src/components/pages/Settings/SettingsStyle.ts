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
    // border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    & .user-icon {
      // border: 1px solid red;
      width: 50px;
      fill: ${({ theme }) => theme.BD_C}4C; //4C: opacity 0.3

      animation: user-icon-ani 0.25s ease-in-out 0s forwards;

      @keyframes user-icon-ani {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }

  & .settings-user-avatar {
    border-radius: 50%;
    object-fit: cover; //원본크기로 넣기

    animation: user-avatar-ani 0.25s ease-in-out 0s forwards;

    @keyframes user-avatar-ani {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

DIV.SettingsTopBtns = styled.div`
  // border: 1px solid black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  & > button,
  div {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 0px;
    height: 30px;
    border-radius: 10px;
    color: ${({ theme }) => theme.FONT_C};
  }

  //업로드 버튼
  & > button {
    width: 100px;
    margin-right: 10px;

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

//제거 및 복구 버튼
DIV.ToggleBtnWrapper = styled.div`
  width: 30px;

  & > button {
    animation: toggle-btn-ani 0.25s ease-in-out 0s forwards;

    @keyframes toggle-btn-ani {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &:disabled {
      cursor: default;

      & .x-mark-icon {
        fill: ${({ theme }) => theme.LOGO_C}4C; //4C: opacity 0.3
      }
    }

    & .x-mark-icon {
      // border: 1px solid black;
      width: 12px;
      fill: ${({ theme }) => theme.LOGO_C};
    }

    & .rotate-icon {
      // border: 1px solid black;
      width: 15px;
      fill: ${({ theme }) => theme.LOGO_C};
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
      top: 40px;
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
