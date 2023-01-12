import { useScrollSpy } from '@hooks/useScrollSpy';
import React from 'react';
import { HeadingType } from './BlogPostTocContainer';
import { StyledBlogPostTocNav, StyledList } from './BlogPostTocStyle';

interface Props {
  headings: HeadingType[];
}

const BlogPostTocPresenter = ({ headings }: Props) => {
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0% 0% -100% 0%' },
  );

  return (
    <StyledBlogPostTocNav>
      <ul>
        {headings.map(({ id, text, level }) => (
          <StyledList key={id} headingLevel={level} headingId={id} activeId={activeId}>
            <a href={`#${text?.toLowerCase().replace(/\s+/g, '-')}`}>{text}</a>
          </StyledList>
        ))}
      </ul>
    </StyledBlogPostTocNav>
  );
};

export default BlogPostTocPresenter;
