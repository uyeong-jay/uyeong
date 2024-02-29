import styled from '@_settings/styled';

interface WriteHeaderProps {
  animationName: string;
}

export const DIV = {} as any;

DIV.WriteHeader = styled.div`
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  //블로그 제목
  & > input {
    border: none;
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.BG_C};
    outline: none;
    padding: 15px 2px;
    height: 70px;
    font-size: xx-large;
    color: ${({ theme }) => theme.FONT_C};
    letter-spacing: 0.5px;
  }
`;

DIV.WriteHeaderTagGroup = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;

  //블로그 태그
  & > ul {
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    max-height: 150px;
    padding: 5px 0;
    margin-right: 1px;

    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      border-radius: 50%;
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      // border: 1px solid black;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.BD_C};
      border-radius: 10px;
    }

    &:hover {
      :-webkit-scrollbar {
        border-radius: 50%;
        width: 5px;
      }
    }

    & > li {
      // border: 1px solid black;
      height: 35px;
      line-height: 35px;
      margin: 5px 12px 5px 0;
      padding: 0 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: ${({ theme }) => theme.LIGHT_BG_C};
      border-radius: 15px;
      cursor: pointer;
      color: ${({ theme }) => theme.FONT_C};
    }
  }

  //블로그 태그 입력
  & > form {
    // border: 1px solid blue;
    position: relative;

    & > input {
      border: none;
      // border: 1px solid black;
      background-color: ${({ theme }) => theme.BG_C};
      outline: none;
      width: 100%;
      height: 50px;
      font-size: large;
      padding-left: 5px;
    }
  }
`;

DIV.DropdownMsg = styled.div<WriteHeaderProps>`
  // border: 1px solid black;
  position: absolute;
  padding: 10px;
  font-size: small;
  white-space: pre-line;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  border-radius: 10px;
  box-shadow: 0 2px 10px rgb(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.FONT_C};

  animation: ${(props) => props.animationName} 0.25s ease-out 0s forwards;

  @keyframes down-msg {
    from {
      top: 45px;
      opacity: 0;
      z-index: -1;
    }
    to {
      top: 55px;
      opacity: 1;
      z-index: 1;
    }
  }

  @keyframes up-msg {
    from {
      top: 55px;
      opacity: 1;
      z-index: 1;
    }
    to {
      top: 45px;
      display: none;
      opacity: 0;
      z-index: -1;
    }
  }
`;
