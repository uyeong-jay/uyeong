import { TagWithCount } from '@pages/Blog/BlogComponents/BlogTags/BlogTagsContainer';
import React from 'react';
import { DIV, SECTION } from './TagsSummaryStyle';
import SummaryTitle from '../SummaryTitle';

interface Props {
  allTags: TagWithCount[];
  onClickTag: (tagName: string) => void;
}

const TagsSummaryPresenter = ({ allTags, onClickTag }: Props) => {
  return (
    <SECTION.Frame>
      <SummaryTitle text="TAGS" />
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
