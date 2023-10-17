import styled from '@_settings/styled';

export const StyledPublishURL = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > div {
    // border: 1px solid black;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 75%;
    height: 50px;
    background-color: #eff1f3;
    border-radius: 20px;
    padding-left: 15px;
    color: darkgray;

    & span {
      margin: 0 2px 3px 10px;
    }

    & span:nth-of-type(2) {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
