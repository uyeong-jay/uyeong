import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;
export const BTN = {} as any;
export const P = {} as any;

SECTION.Frame = styled.section`
  border: 1px solid green;
  margin: 20px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

DIV.Left = styled.div`
  border: 1px solid black;

  & .comment-user-avatar-warpper {
    border: 1px solid black;
    display: inline-flex;
  }

  & .comment-user-avatar {
    border: 1px solid black;
    border-radius: 50%;
    object-fit: cover;
  }
`;

DIV.Right = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

DIV.RightTop = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

DIV.CommentInfo = styled.div`
  border: 1px solid black;
  display: flex;
`;

P.Nickname = styled.p`
  border: 1px solid black;
`;

P.CreatedDate = styled.p`
  border: 1px solid black;
`;

DIV.CommentSideBtnGroup = styled.div`
  border: 1px solid black;
  display: flex;
`;

BTN.CommentUpdateBtn = styled.button`
  border: 1px solid black;
`;

BTN.CommentDeleteBtn = styled.button`
  border: 1px solid black;
`;

DIV.RightMiddle = styled.div`
  border: 1px solid black;
`;

DIV.RightBottom = styled.div`
  border: 1px solid black;
  display: flex;
`;

P.Replies = styled.p`
  border: 1px solid black;
  display: flex;
  padding: 0 5px;

  & .caret-down-icon {
    width: 10px;
    margin-right: 10px;
  }

  & .caret-up-icon {
    width: 10px;
    margin-right: 10px;
    transform: translateY(5%);
  }
`;

BTN.CommentReplyBtn = styled.button`
  border: 1px solid black;
`;

BTN.CommentCancelBtn = styled.button`
  border: 1px solid black;
`;
