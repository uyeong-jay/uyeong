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
    border: 1px solid black;
    width: 75%;
    height: 50px;
    margin: 0 auto;
    border-radius: 20px;
  }
  & > button:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const StyledOpenedCategory = styled.div<PublishCategpryProps>`
  background-color: #eff1f3;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 400px;
  height: 500px;
  border-radius: 20px;

  //애니매이션을 넣을때 내부는 px로 고정시키는게 미세 움직들이 없다
  animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

  @keyframes down-category {
    from {
      height: 0;
      bottom: 500px;
      overflow: hidden;
      pointer-events: none;
    }
    to {
      height: 500px;
      bottom: 0;
    }
  }

  @keyframes up-category {
    from {
      height: 500px;
      bottom: 0;
    }
    to {
      height: 0;
      bottom: 500px;
      overflow: hidden;
      pointer-events: none;
    }
  }

  & > .cancel-button {
    // border: 1px solid black;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 15px;
    color: darkgray;
  }

  & > .cancel-button:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  & > .category-list-block {
    border: 1px solid black;
    margin-top: 60px;
    height: 350px;
    width: 250px;
    border-radius: 10px;

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
      background: black;
      border-radius: 10px;
    }

    & > li {
      // border: 1px solid black;
      border-bottom: 1px solid black;
      margin: 40px auto;
      // width: 250px;
      width: 80%;
      padding-left: 10px;
    }
  }

  & > .button-wrapper {
    // border: 1px solid black;
    width: 250px;
    height: 42px;
    display: flex;
    justify-content: end;
    margin-top: 20px;

    & > .done-button {
      border: 1px solid black;
      width: 100px;
      border-radius: 10px;
    }
  }
`;
