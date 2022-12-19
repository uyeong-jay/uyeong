import { useLayoutEffect } from 'react';

// 마운트시 body로 부터 scroll bar 숨기기
export const useScrollBlock = () => {
  useLayoutEffect(() => {
    const { overflowX, overflowY } = getComputedStyle(window.document.body);

    const prevStyles = {
      overflowX,
      overflowY,
    };

    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';

    return () => {
      window.document.body.style.overflowX = prevStyles.overflowX;
      window.document.body.style.overflowY = prevStyles.overflowY;
    };
  }, []);
  return null;
};
//사용법: useScrollBlock();
