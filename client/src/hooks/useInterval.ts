//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
//https://gist.github.com/babakness/faca3b633bc23d9a0924efb069c9f1f5#file-use-interval-ts-L6
import { useRef, useEffect } from 'react';

type IntervalFunction = () => unknown | void;

function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  //가장 최근 콜백함수 기억해줌
  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  //interval 세팅하기
  useEffect(() => {
    if (delay === null) return;

    function tick() {
      //https://stackoverflow.com/questions/65715282/cannot-invoke-an-object-which-is-possibly-null-ts2721
      typeof savedCallback.current === 'function' && savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;

//사용: useInterval(콜백함수, 딜레이 초수)
