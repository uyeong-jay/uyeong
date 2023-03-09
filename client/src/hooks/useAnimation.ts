import { useState, useEffect, useCallback } from 'react';

// mount/unmount animation
const useAnimation = (show: boolean) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = useCallback(() => {
    if (!show) setRender(false);
  }, [show]);

  return [show, render, onAnimationEnd];
};

export default useAnimation;

//사용
//  const [show, render, onAnimationEnd] = useAnimation(boolean값);
//
// {render && (
//   <div animationName={show ? 'up' : 'down'} onAnimationEnd={() => onAnimationEnd}>
//     ~
//   </div>
//  }

//+styled
// interface PublishCategpryProps {
//   animationName: string;
// }
//const StyledOpenedCategory = styled.div<PublishCategpryProps>`

// animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

// @keyframes up {
//   from {
//     top: 100%;
//   }
//   to {
//     top: 0;
//   }
// }

//  @keyframes down {
//    from {
//      top: 0;
//    }
//    to {
//      top: 100%;
//    }
//  }
//`
