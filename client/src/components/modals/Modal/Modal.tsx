import styled from '@_settings/styled';
import { useCallback, useEffect, useState } from 'react';

interface ModalProps {
  type: string;
  msg: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  callback?: () => void;
  shakeAlert?: boolean;
}

interface StyledModalProps {
  animationName: string;
}

const StyledModal = styled.div<StyledModalProps>`
  // border: 1px solid black;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  user-select: none;

  & > div {
    // border: 1px solid red;
    background-color: ${({ theme }) => theme.INITIAL_BG_C};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 130px;
    position: absolute;
    border-radius: 10px;
    color: ${({ theme }) => theme.FONT_C};
    font-size: 13px;
    box-shadow: 0 2px 10px rgb(0, 0, 0, 0.3);

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 30px)) {
      width: 300px;
      height: 150px;
      font-size: 14px;
    }

    @media screen and (min-width: calc(${({ theme }) => theme.BP.MOBILE} + 80px)) {
      width: 350px;
      height: 170px;
    }

    @media screen and (min-width: calc(${({ theme }) => theme.BP.TABLET} + 80px)) {
      width: 380px;
      height: 180px;
      font-size: 15px;
    }

    animation: ${(props) => props.animationName}
      ${(props) => {
        if (props.animationName === 'shake-alert') return '2s linear';
        else if (props.animationName === 'down-alert') return '0.2s ease-in-out';
        else return '0.2s ease-in-out';
      }}
      0s forwards;

    @keyframes shake-alert {
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

    @keyframes down-alert {
      from {
        top: 0;
        opacity: 0;
      }
      to {
        top: 15px;
        opacity: 1;
      }
    }

    @keyframes up-alert {
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
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    & div {
      border-top: 1px solid ${({ theme }) => theme.BD_C};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: 30%;

      & button {
        // border: 1px solid ${({ theme }) => theme.BD_C};
        width: 100%;
        height: 100%;
        color: ${({ theme }) => theme.FONT_C};
      }

      & > span {
        border-right: 1px solid ${({ theme }) => theme.BD_C};
        height: 60%;
      }

      & .delete-button {
        color: ${({ theme }) => theme.FONT_C_DANGER};
      }

      & .alert-button {
        // border: 1px solid black;
      }

      & .confirm-button {
        // border: 1px solid black;
      }

      & .cancel-button {
        // border: 1px solid black;
      }
    }
  }
`;

const OK = 'OK';
const DELETE = 'Delete';
const CANCEL = 'Cancel';

const Modal = ({ type, msg, isOpen, setOpen, callback, shakeAlert }: ModalProps) => {
  const [render, setRender] = useState(isOpen);

  //헤더 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      setRender(true);
    }
  }, [isOpen]);

  const onAnimationEnd = useCallback(() => {
    if (!isOpen) {
      setRender(false);
    }
  }, [isOpen]);

  const modalContent = () => {
    switch (type) {
      case 'alert': {
        return (
          <div>
            <p>{msg}</p>
            <div>
              <button className="alert-button" onClick={() => setOpen(false)}>
                {OK}
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
              <button
                className="confirm-button"
                onClick={() => {
                  callback?.();
                  setOpen(false);
                }}
              >
                {OK}
              </button>
              <span></span>
              <button className="cancel-button" onClick={() => setOpen(false)}>
                Cancel
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
                {CANCEL}
              </button>
              <span></span>
              <button
                className="delete-button"
                onClick={() => {
                  callback?.();
                  setOpen(false);
                }}
              >
                {DELETE}
              </button>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div>
            <p>{msg}</p>
            <div>
              <button className="default-button" onClick={() => setOpen(false)}>
                {OK}
              </button>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      {render && (
        <StyledModal
          animationName={isOpen ? (shakeAlert ? 'shake-alert' : 'down-alert') : 'up-alert'}
          onAnimationEnd={onAnimationEnd}
        >
          {modalContent()}
        </StyledModal>
      )}
    </>
  );
};

export default Modal;

//사용법

//const [isModalOpen, setModalOpen] = useState(false);

//setModalOpen(true) > modal 열림

//modal안 버튼 클릭 > (callback) > setOpen(false) > modal 닫힘

// <Modal type="alert" msg="메세지" isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />

// <Modal type="confirm" msg="메세지" isOpen={isModalOpen} setOpen={setModalOpen} callback={() => confirmFunc(true)} />
// const confirmFunc = useCallback((isCallback) => {
//   if(!isCallback) return setModalOpen(true);
//
//   //...
//
// }, [setModalOpen]);
