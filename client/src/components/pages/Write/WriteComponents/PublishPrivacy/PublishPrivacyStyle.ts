import styled from '@_settings/styled';

const layout = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPublishPrivacy = styled.div`
  ${layout}
  // border: 1px solid black;
  width: 100%;
  height: 100%;

  & .privacy-block {
    // border: 1px solid black;
    ${layout}
    justify-content: space-between;
    width: 300px;
    height: 100px;

    & .public-button,
    .private-button {
      // border: 1px solid black;
      background-color: #eff1f3;
      width: 140px;
      height: 50%;
      border-radius: 20px;
    }

    & .public-button,
    .private-button {
      color: gray;
    }

    // & .clicked {
    //   background-color: silver;
    //   pointer-events: none; //hover가 바로 안없어짐
    //   user-select: none;
    //   color: black;
    // }

    & .public-button:hover,
    .private-button:hover {
      color: rgba(128, 128, 128, 0.5);
    }
  }
`;
