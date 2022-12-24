import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); //click이 element 밖에 있을경우 handler 호출
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;

//사용법
// import { useRef } from 'react';

// const [isOpen, setOpen] = useState(false);

// const modalRef = useRef(null);

// const onClickOutside = () => {
//   setOpen(false);
// };

// useOnClickOutside(modalRef, onClickOutside);

// const onClickInput = useCallback(() => {
//   if (!isOpen) setOpen(true);
// }, [isOpen]);

// <input
//   type="text"
//   value={value}
//   onChange={onChangeInput}
//   onClick={onClickInput}
//   ref={modalRef}
// />
