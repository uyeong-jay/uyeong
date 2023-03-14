import styled from '@_settings/styled';

interface PublishCategpryProps {
  animationName: string;
}

export const StyledPublishCategory = styled.div`
  // border: 1px solid black;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  & > button {
    // border: 1px solid black;
    background-color: #eff1f3;
    width: 75%;
    height: 50px;
    margin: 0 auto;
    border-radius: 20px;
    color: dimgray;
    display: flex;
    justify-content: center;
    align-items: center;

    & .list-icon {
      // border: 1px solid black;
      width: 13.5px;
      margin-right: 7px;
      transform: translateY(8%);
      fill: dimgray;
    }
  }

  & > button:hover {
    color: rgba(105, 105, 105, 0.5);

    & .list-icon {
      fill: rgba(105, 105, 105, 0.5);
    }
  }
`;

export const StyledOpenedCategory = styled.div<PublishCategpryProps>`
  background-color: #eff1f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 37px;
  width: 400px;
  height: 500px;
  border-radius: 20px;

  //애니매이션을 넣을때 내부는 px로 고정시키는게 미세 움직들이 없다
  animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

  @keyframes down-category {
    from {
      height: 0;
      bottom: 400px;
      overflow: hidden;
      pointer-events: none;
    }
    to {
      height: 400px;
      bottom: 0;
    }
  }

  @keyframes up-category {
    from {
      height: 400px;
      bottom: 0;
    }
    to {
      height: 0;
      bottom: 400px;
      overflow: hidden;
      pointer-events: none;
    }
  }

  & > .category-list-block {
    border: 1px solid gray;
    margin-top: 50px;
    height: 300px;
    width: 250px;
    border-radius: 10px;
    overflow: hidden;

    & > li {
      // border: 1px solid black;
      position: relative;
      border-bottom: 1px solid gray;
      margin: 40px 0 40px 20px;
      // width: 250px;
      width: 200px;
      padding-left: 10px;
      cursor: pointer;

      & .check-icon {
        // border: 1px solid black;
        position: absolute;
        right: 0;
        top: 0;
        width: 15px;
        fill: dimgray;
      }
    }

    // & > li:hover {
    //   color: rgba(0, 0, 0, 0.5);
    //   border-bottom: 1px solid rgba(105, 105, 105, 0.5);
    // }
  }

  & > .category-list-block:hover {
    //스크롤 디자인
    overflow-y: scroll;

    overflow-x: hidden;

    ::-webkit-scrollbar {
      border-radius: 50%;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 50%;
    }
    ::-webkit-scrollbar-thumb {
      background: dimgray;
      border-radius: 10px;
    }
  }

  & > .button-group {
    // border: 1px solid black;
    width: 250px;
    height: 42px;
    display: flex;
    justify-content: end;
    margin-top: 15px;
    margin-bottom: 15px;

    & > .done-button {
      // border: 1px solid dimgray;
      background-color: gainsboro;
      width: 100px;
      border-radius: 10px;
      color: black;
    }

    &>.done-button: hover {
      color: rgba(0, 0, 0, 0.5);
    }

    // & > .cancel-button {
    //   margin-right: 15px;
    // }
  }
`;
