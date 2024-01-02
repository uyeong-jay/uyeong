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
      //next/dynamic 적용시
      //다른 페이지에서 새로고침 후 해당 페이지로 올때 필요
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

//사용법

// <div id="posts_intersection_target" ref={targetRef}></div>

// const [isIntersectionEnded, setIntersectionEnded] = useState(false);

// const targetRef = useIntersect(
//   async (entry, observer) => {
//     observer.unobserve(entry.target);
//     //서버에서 받아온 next_cursor 가 있을때 실행
//     if (blogPostsDataBySearch?.next_cursor && !isIntersectionEnded) {
//       setIntersectionEnded(true);
//       setSearchInfo({
//         ...searchInfo,
//         nextPageId: blogPostsDataBySearch.next_cursor,
//       });
//     }
//   },
//   {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.5,
//   },
//   'posts_intersection_target',
// );
