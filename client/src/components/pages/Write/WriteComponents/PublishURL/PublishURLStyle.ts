import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.PublishURL = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.FONT_C};

  & > div {
    // border: 1px solid black;
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    border-radius: 20px;
    padding: 0 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    & span {
      opacity: 0.5;
    }

    & span:nth-of-type(2) {
      margin: 0 10px 3px 8px;
      font-size: 18px;
    }

    & span:nth-of-type(n + 3) {
      font-size: 16px;
    }

    & span:nth-of-type(3),
    span:nth-of-type(5) {
      font-weight: bold;
      padding: 0 2px;
    }
  }
`;
