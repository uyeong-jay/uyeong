import { useRef, useEffect } from 'react';

type IntervalFunction = () => unknown | void;

const useInterval = (callback: IntervalFunction, delay: number | null) => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  //가장 최근 콜백함수 기억하기
  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  //interval 세팅하기
  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      //https://stackoverflow.com/questions/65715282/cannot-invoke-an-object-which-is-possibly-null-ts2721
      typeof savedCallback.current === 'function' && savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;

//사용: useInterval(콜백함수, 딜레이 초수)
