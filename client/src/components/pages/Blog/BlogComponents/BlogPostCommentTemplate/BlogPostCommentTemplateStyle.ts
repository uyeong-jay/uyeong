import styled from '@_settings/styled';

interface CommentReplyBtnProps {
  writeReply: boolean;
}

export const SECTION = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;
export const P = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.FONT_C};
`;

DIV.CommentTop = styled.div`
  // border: 1px solid black;
  display: flex;
  width: 100%;

  & .comment-user-avatar-warpper {
    // border: 1px solid black;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    transition: background-color 0.25s linear; // for theme mode
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 9vw;
    min-width: 25px;
    max-width: 40px;
    height: 8vw;
    min-height: 25px;
    max-height: 40px;
    border-radius: 50%;

    & .user-icon {
      // border: 1px solid red;
      width: 45%;
      fill: ${({ theme }) => theme.BD_C}7F; //7F: opacity 0.5
    }
  }

  & .comment-user-avatar {
    // border: 1px solid black;
    border-radius: 50%;
  }
`;

DIV.CommentTopRight = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 10px;
`;

DIV.CommentInfo = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > span {
    // border: 1px solid black;
    display: none;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > span {
      // border: 1px solid black;
      display: inline-block;
      margin: 0 5px;
    }
  }
`;

P.Nickname = styled.p`
  // border: 1px solid black;
  font-weight: bold;
  opacity: 0.8;
`;

P.CreatedDate = styled.p`
  // border: 1px solid black;
  font-weight: bold;
  opacity: 0.6;
  font-size: 11px;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 13px;
  }
`;

DIV.CommentMenu = styled.div`
  // border: 1px solid black;
  display: flex;
  cursor: pointer;
  position: relative;

  & > .ellipsis-vertical-icon {
    // border: 1px solid black;
    width: 15px;
    height: 15px;
    fill: ${({ theme }) => theme.BD_C};
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & > .ellipsis-vertical-icon {
      width: 18px;
      height: 18px;
    }
  }
`;

DIV.CommentMenuBtns = styled.div`
  // border: 1px solid black;
  background-color: ${({ theme }) => theme.LIGHT_BG_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 70px;
  position: absolute;
  top: 30px;
  left: -90px;
  z-index: 1;
  border-radius: 10px;
  box-shadow: 0 2px 7px rgb(0, 0, 0, 0.2);

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 120px;
    left: -110px;
  }

  & > button {
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: ${({ theme }) => theme.FONT_C};

    & > .edit-icon {
      // border: 1px solid black;
      width: 10px;
      height: 10px;
      margin-right: 8px;
      fill: ${({ theme }) => theme.BD_C};
    }
    & > .trash-icon {
      // border: 1px solid black;
      width: 10px;
      height: 10px;
      margin-right: 8px;
      fill: ${({ theme }) => theme.BD_C};
    }
  }
`;

BTN.CommentEditBtn = styled.button`
  // border: 1px solid black;
  width: 100%;
  height: 42%;
`;

BTN.CommentDeleteBtn = styled.button`
  // border: 1px solid black;
  width: 100%;
  height: 42%;
`;

DIV.CommentMain = styled.div`
  // border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  padding-left: 3px;

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 14px;
  }
`;

//마크다운 내용
DIV.CommentMainContent = styled.div`
  border: 1px solid transparents; //코드블륵 주변 높이 고정
  padding: 12px 0px 12px 10px;
  overflow: hidden;
  font-size: 11px;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  & p {
    white-space: pre-wrap; //for multiple line breaking
  }

  & pre code div {
    margin: 0 0 20px 0;
  }

  & > p > strong {
    font-size: 10px;
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 13px;
    & > p > strong {
      font-size: 12px;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 17px;
    & > p > strong {
      font-size: 15px;
    }
  }
`;

DIV.CommentMainReply = styled.div`
  // border: 1px solid black;
  display: flex;
  margin-top: -16px;

  & > span {
    margin: 0 7px 0 5px;
    cursor: default;
  }
`;

P.Replies = styled.p`
  // border: 1px solid black;
  display: flex;
  padding: 0 5px;
  cursor: pointer;

  & .caret-down-icon {
    width: 10px;
    margin-right: 10px;
    fill: ${({ theme }) => theme.BD_C};
  }

  & .caret-up-icon {
    width: 10px;
    margin-right: 10px;
    transform: translateY(5%);
    fill: ${({ theme }) => theme.BD_C};
  }
`;

BTN.CommentReplyBtn = styled.button<CommentReplyBtnProps>`
  // border: 1px solid black;
  margin-left: -4px;
  color: ${({ theme }) => theme.FONT_C}B2; //B2: opacity: 0.7;
  font-weight: bold;

  ${(props) => {
    if (props.writeReply) {
      return `
        opacity: 0.4;
        cursor: default;
      `;
    } else {
      return `
        opacity: 1;
      `;
    }
  }}
`;
