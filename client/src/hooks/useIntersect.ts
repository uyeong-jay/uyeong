import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

export const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit, elementId?: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [targetRef, setTargetRef] = useState(ref.current);
  const [isScrolled, setScrolled] = useState(false);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) {
      //다른 페이지에서 새로고침 후 해당 페이지로 올때 실행됨
      //next/dynamic 적용시 필요
      const ElementById = document.getElementById(elementId || '') as SetStateAction<HTMLDivElement | null>;
      const handleScroll = () => {
        if (!isScrolled) {
          setScrolled(true);
          setTargetRef(ElementById);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current || targetRef);
    return () => observer.disconnect();
  }, [ref, callback, options, isScrolled, elementId, targetRef]);

  return ref;
};
