import { useLayoutEffect } from 'react';

// 마운트시 body로 부터 scroll bar 숨기기
const useScrollBlock = () => {
  useLayoutEffect(() => {
    const { overflowX, overflowY } = getComputedStyle(document.body);

    const prevStyles = {
      overflowX,
      overflowY,
    };

    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowX = prevStyles.overflowX;
      document.body.style.overflowY = prevStyles.overflowY;
    };
  }, []);
  return null;
};

export default useScrollBlock;
//사용: useScrollBlock();
