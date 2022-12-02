import { useLayoutEffect } from 'react';

// 마운트시 body로 부터 scroll bar 숨기기
// 이후 언마운트로 되돌리기
const HideScroll = () => {
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

export default HideScroll;
