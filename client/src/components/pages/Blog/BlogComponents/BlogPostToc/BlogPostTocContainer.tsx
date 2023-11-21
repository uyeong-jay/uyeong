import { memo, useEffect, useState } from 'react';
import BlogPostTocPresenter from './BlogPostTocPresenter';

export interface HeadingType {
  id: string;
  text: string | null;
  level: number;
}

const BlogPostTocContainer = () => {
  const [headings, setHeadings] = useState<HeadingType[]>([]);

  useEffect(() => {
    const markdownContent = document.getElementById('markdown-content');
    if (markdownContent) {
      //제목 중복 체크 후 id 변경 해놓기
      const idCountMap = new Map();
      Array.from(markdownContent.querySelectorAll('h1, h2, h3')).forEach((heading) => {
        const originalId = heading.id;
        let newId = originalId;
        let count = 1;

        //제목 중복 체크
        while (idCountMap.has(newId)) {
          count++;
          newId = `${originalId}-${count}`;
        }

        // idCountMap에서 count 업데이트 하기
        idCountMap.set(newId, count);

        // id가 바뀌었으면 요소의 heading id 업데이트하기
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
    }
  }, []);

  return <BlogPostTocPresenter headings={headings} />;
};

export default memo(BlogPostTocContainer);
