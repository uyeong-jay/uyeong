import styled from '@_settings/styled';

const Layout = styled.section`
  border: 1px solid green;
  margin: 20px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const Left = styled.div`
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

const Right = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RightTop = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const CommentInfo = styled.div`
  border: 1px solid black;
  display: flex;
`;

const Nickname = styled.p`
  border: 1px solid black;
`;

const CreatedDate = styled.p`
  border: 1px solid black;
`;

const CommentSideBtnGroup = styled.div`
  border: 1px solid black;
  display: flex;
`;

const CommentUpdateBtn = styled.button`
  border: 1px solid black;
`;

const CommentDeleteBtn = styled.button`
  border: 1px solid black;
`;

const RightMiddle = styled.div`
  border: 1px solid black;
`;

const RightBottom = styled.div`
  border: 1px solid black;
  display: flex;
`;

const Replies = styled.p`
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

const CommentReplyBtn = styled.button`
  border: 1px solid black;
`;

const CommentCancelBtn = styled.button`
  border: 1px solid black;
`;

export const SECTION = {
  Layout,
};

export const DIV = {
  Left,
  Right,
  RightTop,
  CommentInfo,
  CommentSideBtnGroup,
  RightMiddle,
  RightBottom,
};

export const P = {
  Replies,
  Nickname,
  CreatedDate,
};

export const BTN = {
  CommentUpdateBtn,
  CommentDeleteBtn,
  CommentReplyBtn,
  CommentCancelBtn,
};
