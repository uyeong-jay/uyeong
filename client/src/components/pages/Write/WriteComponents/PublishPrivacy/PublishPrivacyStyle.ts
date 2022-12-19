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

    & .public-button {
      border: 1px solid black;
      width: 140px;
      height: 50%;
      border-radius: 20px;
    }

    & .private-button {
      border: 1px solid black;
      width: 140px;
      height: 50%;
      border-radius: 20px;
    }

    & .public-button:hover,
    .private-button:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
