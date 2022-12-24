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
  display: flex;
  justify-content: center;
  align-items: start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: transparent;
  user-select: none;

  & > div {
    border: 1px solid black;
    width: 200px;
    height: 100px;
    margin-top: 100px;

    animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

    @keyframes down-alert-modal {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes up-alert-modal {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
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
            <button className="alert-button" onClick={() => setOpen(false)}>
              확인
            </button>
          </div>
        );
      }
      case 'confirm': {
        return (
          <div>
            <p>{msg}</p>
            <button className="confirm-cancel-button" onClick={() => setOpen(false)}>
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
        );
      }
      case 'delete': {
        return (
          <div>
            <p>{msg}</p>
            <button className="delete-cancel-button" onClick={() => setOpen(false)}>
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
        <StyledModal animationName={isOpen ? 'down-alert-modal' : 'up-alert-modal'} onAnimationEnd={onAnimationEnd}>
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
