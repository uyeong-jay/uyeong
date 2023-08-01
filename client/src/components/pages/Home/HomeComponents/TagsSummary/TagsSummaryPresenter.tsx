import { TagWithCount } from '@pages/Blog/BlogPage/BlogContainer';
import React from 'react';
import { DIV, SECTION } from './TagsSummaryStyle';

interface Props {
  allTags: TagWithCount[];
  onClickTag: (tagName: string) => void;
}

const TagsSummaryPresenter = ({ allTags, onClickTag }: Props) => {
  return (
    <SECTION.Frame>
      <DIV.TSTitleWrapper>
        <h1>TAGS</h1>
      </DIV.TSTitleWrapper>
      <DIV.TagsWrapper>
        {allTags.map((tag, index) => (
          <DIV.TagWrapper key={index} onClick={() => onClickTag(tag.name)} tagCount={tag.count}>
            {tag.name}
          </DIV.TagWrapper>
        ))}
      </DIV.TagsWrapper>
    </SECTION.Frame>
  );
};

export default TagsSummaryPresenter;
