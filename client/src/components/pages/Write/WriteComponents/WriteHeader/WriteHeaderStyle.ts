import styled from '@_settings/styled';

interface WriteHeaderProps {
  animationName: string;
}

export const StyledWriteHeader = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 200px;

  //Title input
  & > input {
    // border: 1px solid black;
    border: none;
    outline: none;
    height: 80px;
    font-size: xx-large;
  }

  & > .write-header-tag-group {
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    & > ul {
      // border: 1px solid black;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      & > li {
        // border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        margin: 5px;
        padding: 0 10px;
        background-color: #eff1f3;
        border-radius: 15px;
        cursor: pointer;
      }
    }

    & > form {
      // border: 1px solid black;
      height: 50px;

      & > input {
        // border: 1px solid black;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: large;
        padding-left: 5px;
        padding-bottom: 10px;
      }
    }
  }
`;

export const StyledDropdownMsg = styled.div<WriteHeaderProps>`
  // border: 1px solid black;
  position: absolute;
  width: 290px;
  padding: 10px;
  font-size: small;
  background-color: #eff1f3;

  animation: ${(props) => props.animationName} 0.25s ease-out 0s forwards;

  @keyframes down-msg {
    from {
      bottom: -45px;
      opacity: 0;
      z-index: -1;
    }
    to {
      bottom: -55px;
      opacity: 1;
      z-index: 1;
    }
  }

  @keyframes up-msg {
    from {
      bottom: -55px;
      opacity: 1;
      z-index: 1;
    }
    to {
      bottom: -45px;
      display: none;
      opacity: 0;
      z-index: -1;
    }
  }
`;
