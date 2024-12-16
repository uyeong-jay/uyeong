import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.PublishPreview = styled.div`
  // border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  & .post-thumbnail-wrapper {
    // border: 1px solid yellow;
    width: 100%;
    height: 50vw;
    min-height: 170px;

    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      height: 200px;
    }
  }

  & .post-thumbnail-wrapper-with-image {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: inline-flex;
    flex-direction: column;
    position: relative;

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

    & > button {
      // border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${({ theme }) => theme.FONT_C};
      font-size: 15px;
      opacity: 0.8;

      & > .camera-icon {
        // border: 1px solid black;
        width: 20px;
        margin-bottom: 10px;
        cursor: pointer;
        fill: ${({ theme }) => theme.FONT_C};
      }

      @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 100px)) {
        font-size: 18px;

        & > .camera-icon {
          width: 25px;
        }
      }
    }
  }

  & .post-thumbnail {
    // border: 1px solid green;
    border-radius: 15px;
    object-fit: cover; //원본크기로 넣기
    z-index: 1;
  }

  //post-thumbnail을 클릭 되도록 하지 않고 그 밑에 있는 요소가 클릭되게 함
  & .non-clickable-image {
    pointer-events: none;
  }

  & > textarea {
    border: none;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    width: 100%;
    height: 30vw;
    min-height: 140px;
    margin: 0 auto;
    padding: 15px;
    resize: none; //textarea 크기조절 막기
    border-radius: 15px;
    color: ${({ theme }) => theme.FONT_C};

    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      border-radius: 50%;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      margin: 10px 0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.BD_C}4C; //4C: opacity 30%
      border-radius: 10px;
    }

    &::placeholder {
      color: ${({ theme }) => theme.FONT_C};
      opacity: 0.5;
    }

    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      height: 150px;
    }
  }

  & > span {
    // border: 1px solid black;
    width: 100%;
    margin: 0 auto;
    text-align: end;
    padding-right: 10px;
    padding-top: 5px;
    opacity: 0.8;
    font-size: 12px;
  }
`;

DIV.PublishPreviewBtns = styled.div`
  // border: 1px solid black;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0 50px 0;
  width: 100%;

  & > button,
  .preview-active-btns {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0px;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color: ${({ theme }) => theme.FONT_C};
  }

  & > .preview-upload-btn {
    // border: 1px solid black;
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

  & > .preview-active-btns {
    // border: 1px solid black;
    width: 30px;
    transition: width 0.25s ease-out;

    & > button {
      // border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }

      & .x-mark-icon {
        // border: 1px solid black;
        position: absolute; //모바일환경의 실제 width가 다르게 적용되어 추가
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        fill: ${({ theme }) => theme.LOGO_C};
      }

      & .rotate-icon {
        // border: 1px solid black;
        position: absolute; //모바일환경의 실제 width가 다르게 적용되어 추가
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 15px;
        fill: ${({ theme }) => theme.LOGO_C};
      }
    }
  }

  & > .extend {
    width: 80px;
  }
`;
