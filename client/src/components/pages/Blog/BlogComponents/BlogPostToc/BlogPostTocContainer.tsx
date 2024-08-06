import { memo, useEffect, useState } from 'react';
import BlogPostTocPresenter from './BlogPostTocPresenter';

export interface HeadingType {
  id: string;
  text: string | null;
  level: number;
}

const BlogPostTocContainer = () => {
  const [headings, setHeadings] = useState<HeadingType[]>([]);

  const updateHeadings = (markdownContent: HTMLElement) => {
    const idCountMap = new Map();

    Array.from(markdownContent.querySelectorAll('h1, h2, h3')).forEach((heading) => {
      const originalId = heading.id;
      let newId = originalId;
      let count = 1;

      while (idCountMap.has(newId)) {
        count++;
        newId = `${originalId}-${count}`;
      }

      idCountMap.set(newId, count);

      if (originalId !== newId) {
        heading.id = newId;
      }
    });

    const headingEls = Array.from(markdownContent.querySelectorAll('h1, h2, h3')).map((headingEl) => ({
      id: headingEl.id,
      text: headingEl.textContent ?? '',
      level: Number(headingEl.tagName.substring(1)),
    }));

    setHeadings(headingEls);
  };

  useEffect(() => {
    const markdownContent = document.getElementById('markdown-content');
    if (markdownContent) {
      //MutationObserver: DOM이 변할 때마다 콜백 함수를 실행
      const observer = new MutationObserver((mutations, observer) => {
        const headingsExist = markdownContent.querySelector('h1, h2, h3');
        if (headingsExist) {
          updateHeadings(markdownContent);
          observer.disconnect(); // 한번 업데이트 후 더 이상 감지하지 않음
        }
      });

      observer.observe(markdownContent, { childList: true, subtree: true });

      // 초기에도 확인
      updateHeadings(markdownContent);

      return () => {
        //DOM 변화 감지 해제
        observer.disconnect();
      };
    }
  }, []);

  return <BlogPostTocPresenter headings={headings} />;
};

export default memo(BlogPostTocContainer);
