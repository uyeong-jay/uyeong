import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;
export const P = {} as any;

interface CommentReplyBtnProps {
  writeReply: boolean;
}

SECTION.Frame = styled.section`
  // border: 1px solid green;
  // margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: start;
`;

DIV.Left = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  & .comment-user-avatar-warpper {
    // border: 1px solid black;
    display: inline-flex;
    position: relative;
    width: 7vw;
    min-width: 25px;
    max-width: 40px;
    height: 7vw;
    min-height: 25px;
    max-height: 40px;

  & .comment-user-avatar {
    // border: 1px solid black;
    border-radius: 50%;
  }
`;

DIV.Right = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 88%;
  margin-left: 7px;
  font-size: 8px;
  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 80px)) {
    font-size: 10px;
  }
  @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} - 150px)) {
    font-size: 12px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    margin-left: 15px;
    font-size: 14px;
  }
`;

DIV.RightTop = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

DIV.CommentInfo = styled.div`
  // border: 1px solid black;
  display: flex;
`;

P.Nickname = styled.p`
  // border: 1px solid black;
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
`;

P.CreatedDate = styled.p`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  color: ${({ theme }) => theme.FONT_C};
  font-weight: bold;
  opacity: 0.7;
  font-size: 8px;
  @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 80px)) {
    font-size: 11px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 13px;
  }
`;

DIV.CommentSideBtnGroup = styled.div`
  // border: 1px solid black;
  display: flex;
  opacity: 0.8;
`;

BTN.CommentUpdateBtn = styled.button`
  // border: 1px solid black;
  color: ${({ theme }) => theme.FONT_C};
`;

BTN.CommentDeleteBtn = styled.button`
  // border: 1px solid black;
  color: ${({ theme }) => theme.FONT_C};
`;

//마크다운 내용 들어 가는 곳
DIV.RightMiddle = styled.div`
  // border: 1px solid red;
  padding: 10px 5px 10px 2px;
  font-size: 11px;
  word-break: keep-all;
  overflow: hidden;
  line-height: 1.7;
  letter-spacing: -0.004em;
  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 13px;
  }
  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 17px;
  }

  & > p > img {
    margin: 1rem auto;
  }
`;

DIV.RightBottom = styled.div`
  // border: 1px solid black;
  display: flex;

  & > span {
    margin: 0 7px 0 5px;
    cursor: default;
  }
`;

P.Replies = styled.p`
  // border: 1px solid black;
  display: flex;
  margin-left: -3px;
  padding: 0 5px;
  color: ${({ theme }) => theme.FONT_C};
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
  color: ${({ theme }) => theme.FONT_C};
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
