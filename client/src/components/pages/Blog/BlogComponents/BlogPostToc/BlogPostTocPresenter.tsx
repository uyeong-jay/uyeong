import { useScrollSpy } from '@hooks/useScrollSpy';
import React from 'react';
import { HeadingType } from './BlogPostTocContainer';
import { StyledBlogPostToc, StyledList } from './BlogPostTocStyle';

interface Props {
  headings: HeadingType[];
}

const BlogPostTocPresenter = ({ headings }: Props) => {
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0% 0% -100% 0px' },
  );

  return (
    <StyledBlogPostToc>
      {headings.map(({ id, text, level }) => (
        <StyledList key={id} headingLevel={level} headingId={id} activeId={activeId}>
          <a href={`#${text?.toLowerCase().replace(/\s+/g, '-')}`}>{text}</a>
        </StyledList>
      ))}
    </StyledBlogPostToc>
  );
};

export default BlogPostTocPresenter;
