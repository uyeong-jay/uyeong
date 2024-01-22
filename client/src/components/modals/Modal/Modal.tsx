import styled from '@_settings/styled';
import { useAppDispatch } from '@app/hooks';
import { scrollDir } from '@organisms/Header/HeaderPresenter';
import { scrollDownForModal, scrollUpForModal, scrollResetForModal } from '@organisms/Header/HeaderSlice';
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
        if (props.animationName === 'shake-alert') return '2s linear';
        else if (props.animationName === 'up-alert') return '0.2s ease-in-out';
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

const Modal = ({ type, msg, isOpen, setOpen, callback, shakeAlert }: ModalProps) => {
  const [render, setRender] = useState(isOpen);
  const dispatch = useAppDispatch();

  //헤더 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      if (scrollDir === 'down') dispatch(scrollDownForModal());
      if (scrollDir === 'up') dispatch(scrollUpForModal());
      setRender(true);
    }
  }, [dispatch, isOpen]);

  const onAnimationEnd = useCallback(() => {
    if (!isOpen) {
      dispatch(scrollResetForModal());
      setRender(false);
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (isOpen) {
      //modal이 열릴때
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
      `;
      //top: -${window.scrollY}px; 현재 위치로 스크롤 이동

      //modal이 닫힐때(언마운트 될때)
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, (parseInt(scrollY || '0', 10) - 0.5) * -1); //원래 위치로 스크롤 이동 //0.5px이 밀려 -0.5 추가
      };
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
