import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.PublishActionButtons = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;

  & > div {
    // border: 1px solid black;
    display: flex;
    justify-content: end;
    align-items: end;
    width: 100%;

    & > button {
      // border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.LIGHT_BG_C};
      height: 45px;
      border-radius: 15px;
      color: ${({ theme }) => theme.FONT_C};
      letter-spacing: 0.5px;
      width: 80px;
    }

    & > button:nth-of-type(1) {
      // border: 1px solid black;
      margin-right: 25px;
    }

    & > button:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

DIV.PublishActionLoading = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: transparent;
  user-select: none;
`;
