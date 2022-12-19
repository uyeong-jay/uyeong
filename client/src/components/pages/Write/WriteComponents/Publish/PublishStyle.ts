import styled from '@_settings/styled';

interface PublishProps {
  animationName: string;
}

export const StyledPublish = styled.div<PublishProps>`
  // border: 1px solid red;
  background-color: white;
  display: grid;
  place-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

  @keyframes up-publish {
    from {
      top: 100%;
    }
    to {
      top: 0;
    }
  }

  @keyframes down-publish {
    from {
      top: 0;
    }
    to {
      top: 100%;
    }
  }

  & .publish-block {
    // border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 500px;

    & .publish-right-group {
      // border: 1px solid red;
      width: 100%;
      height: 100%;
    }

    & .publish-left-group {
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;
