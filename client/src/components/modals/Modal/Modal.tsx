import styled from '@_settings/styled';
import { useCallback, useEffect, useState } from 'react';

interface ModalProps {
  type: string;
  msg: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  callback?: () => void;
}

interface StyledModalProps {
  animationName: string;
}

const StyledModal = styled.div<StyledModalProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: transparent;
  user-select: none;

  & > div {
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 150px;
    position: absolute;
    background-color: white;
    // background-color: paleturquoise;
    border-radius: 10px;
    // box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);

    animation: ${(props) => props.animationName}
      ${(props) => {
        if (props.animationName === 'shake-alert-modal') return '2s linear';
        else if (props.animationName === 'up-alert-modal') return '0.2s ease-in-out';
        else return '0.2s ease-in-out';
      }}
      0s forwards;

    @keyframes shake-alert-modal {
      0% {
        top: 15px;
        transform: rotateZ(0);
      }
      5% {
        transform: rotateZ(-7deg);
      }
      10% {
        transform: rotateZ(7deg);
      }
      15% {
        transform: rotateZ(-5deg);
      }
      20% {
        transform: rotateZ(3deg);
      }
      25% {
        transform: rotateZ(-1deg);
      }
      30%,
      100% {
        top: 15px;
        transform: rotateZ(0);
      }
    }

    @keyframes up-alert-modal {
      from {
        top: 15px;
        opacity: 1;
      }
      to {
        top: 0;
        opacity: 0;
        display: none;
      }
    }

    & p {
      // border: 1px solid blue;
      width: 100%;
      height: 65%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & div {
      // border: 1px solid black;
      display: flex;
      justify-content: end;
      align-items: center;
      width: 100%;
      height: 35%;

      & button {
        // border: 1px solid red;
        width: 70px;
        height: 30px;
        border-radius: 10px;
        margin-right: 10px;
      }

      & .alert-button {
        background-color: lightsteelblue;
      }

      & .confirm-button {
        background-color: lightslategray;
      }

      & .delete-button {
        background-color: indianred;
      }

      & .cancel-button {
        background-color: gray;
      }
    }
  }
`;

const Modal = ({ type, msg, isOpen, setOpen, callback }: ModalProps) => {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const onAnimationEnd = useCallback(() => {
    if (!isOpen) setRender(false);
  }, [isOpen]);

  const modalContent = () => {
    switch (type) {
      case 'alert': {
        return (
          <div>
            <p>{msg}</p>
            <div>
              <button className="alert-button" onClick={() => setOpen(false)}>
                확인
              </button>
            </div>
          </div>
        );
      }
      case 'confirm': {
        return (
          <div>
            <p>{msg}</p>
            <div>
              <button className="cancel-button" onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className="confirm-button"
                onClick={() => {
                  callback?.();
                  setOpen(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        );
      }
      case 'delete': {
        return (
          <div>
            <p>{msg}</p>
            <div>
              <button className="cancel-button" onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  callback?.();
                  setOpen(false);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div>
            <p>{msg}</p>
            <button className="default-button" onClick={() => setOpen(false)}>
              확인
            </button>
          </div>
        );
      }
    }
  };

  return (
    <>
      {render && (
        <StyledModal animationName={isOpen ? 'shake-alert-modal' : 'up-alert-modal'} onAnimationEnd={onAnimationEnd}>
          {modalContent()}
        </StyledModal>
      )}
    </>
  );
};

export default Modal;

//사용법

//setModalOpen(true) > modal 열림

//modal안 버튼 클릭 > (callback) > setOpen(false) > modal 닫힘

// <Modal type="alert" msg="메세지" isOpen={isModalOpen} setOpen={setModalOpen} />

// <Modal type="confirm" msg="메세지" isOpen={isModalOpen} setOpen={setModalOpen} callback={() => func(true)} />
// const func = useCallback((isCallback) => {
//   if(!isCallback) return setModalOpen(true);
//
//   //...
//
// }, [setModalOpen]);
