import styled from '@_settings/styled';

export const StyledWriteFooter = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 60px;
  padding: 15px;
  background-color: #dadada;

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

    & .angle-left-icon {
      // border: 1px solid black;
      width: 9.5px;
      margin-right: 10px;
      fill: ${({ theme }) => theme.FONT_C};
    }
  }

  & > .done-button {
    // border: 1px solid black;
    display: flex;
    justify-content: end;
    align-items: center;

    & .angle-up-icon {
      // border: 1px solid black;
      width: 14px;
      margin-left: 10px;
      fill: ${({ theme }) => theme.FONT_C};
    }
  }
`;
