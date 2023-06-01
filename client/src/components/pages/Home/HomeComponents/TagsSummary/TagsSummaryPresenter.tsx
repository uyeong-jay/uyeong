import { TagWithCount } from '@pages/Blog/BlogPage/BlogContainer';
import React from 'react';
import { DIV, SECTION } from './TagsSummaryStyle';

interface Props {
  allTags: TagWithCount[];
  onClickTag: (tagName: string) => void;
}

const TagsSummaryPresenter = ({ allTags, onClickTag }: Props) => {
  return (
    <SECTION.Layout>
      <h1>Tags</h1>
      <DIV.TagsWrapper>
        {allTags.map((tag, index) => (
          <div key={index} onClick={() => onClickTag(tag.name)}>
            {tag.name}
          </div>
        ))}
      </DIV.TagsWrapper>
    </SECTION.Layout>
  );
};

export default TagsSummaryPresenter;
