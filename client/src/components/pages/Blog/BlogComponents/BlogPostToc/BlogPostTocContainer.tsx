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
    const markdownContent = document.getElementById('markdown-content') ?? document;
    const headingEls = Array.from(markdownContent.querySelectorAll('h1, h2, h3')).map((headingEl) => ({
      id: headingEl.id,
      text: headingEl.textContent ?? '',
      level: Number(headingEl.tagName.substring(1)),
    }));

    setHeadings(headingEls);
  }, []);

  return <BlogPostTocPresenter headings={headings} />;
};

export default memo(BlogPostTocContainer);
