import styled from '@_settings/styled';

export const StyledWriteFooter = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 0;
  left: -25px;
  width: calc(100% + 25px);
  height: 60px;
  padding: 15px;
  background-color: ${({ theme }) => theme.INITIAL_BG_C};

  & > button {
    // border: 1px solid black;
    width: 100px;
    color: ${({ theme }) => theme.FONT_C};
  }

  & > .back-button {
    // border: 1px solid black;
    display: flex;
    justify-content: start;
    align-items: center;

    & .arrow-left-icon {
      // border: 1px solid black;
      width: 9px;
      margin-right: 10px;
      fill: ${({ theme }) => theme.FONT_C};
      opacity: 0.7;
      transform: translateY(-1px);
    }
  }

  & > .done-button {
    // border: 1px solid black;
    display: flex;
    justify-content: end;
    align-items: center;

    & .arrow-up-icon {
      // border: 1px solid black;
      width: 16px;
      margin-left: 10px;
      fill: ${({ theme }) => theme.FONT_C};
      opacity: 0.7;
    }
  }
`;
