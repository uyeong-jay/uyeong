import { useEffect, useState } from 'react';
import BlogPostTocPresenter from './BlogPostTocPresenter';

export interface HeadingType {
  id: string;
  text: string | null;
  level: number;
}

const BlogPostTocContainer = () => {
  const [headings, setHeadings] = useState<HeadingType[]>([]);

  useEffect(() => {
    const headingEls = Array.from(document.querySelectorAll('h1, h2, h3'))
      .filter((headingEl) => headingEl.id) //제목이 같아도 고유 제목 id로 재추출(중복x)
      .map((headingEl) => ({
        id: headingEl.id,
        text: headingEl.textContent ?? '',
        level: Number(headingEl.tagName.substring(1)),
      }));
    setHeadings(headingEls);
  }, []);
  return <BlogPostTocPresenter headings={headings} />;
};

export default BlogPostTocContainer;
