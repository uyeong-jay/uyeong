import { useState, useEffect, useCallback } from 'react';

// mount/unmount animation
export const useAnimation = (toggle: boolean) => {
  const [showAnimation, setShowAnimation] = useState(toggle);

  useEffect(() => {
    if (toggle) setShowAnimation(true);
  }, [toggle]);

  const onAnimationEnd = useCallback(() => {
    if (!toggle) setShowAnimation(false);
  }, [toggle]);

  return [toggle, showAnimation, onAnimationEnd];
};

//사용법
//  const [toggle, showAnimation, onAnimationEnd] = useAnimation(boolean값);
//
// {showAnimation && (
//   <div animationName={toggle ? 'up' : 'down'} onAnimationEnd={() => onAnimationEnd}>
//     ~
//   </div>
//  }

//styled
// animation: ${(props) => props.animationName} 0.5s ease-out 0s forwards;

//   @keyframes up {
//     from {
//       top: 100%;
//     }
//     to {
//       top: 0;
//     }
//   }

//   @keyframes down {
//     from {
//       top: 0;
//     }
//     to {
//       top: 100%;
//     }
//   }
