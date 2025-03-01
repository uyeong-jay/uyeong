import React from 'react';
import { DIV, SECTION } from './TagsSummaryStyle';
import SummaryTitle from '../SummaryTitle';
import { BlogTagRes } from '@app/services/blog/tagApi';

interface Props {
  blogTagsData?: BlogTagRes;
  onClickTag: (tagName: string) => void;
}

const TagsSummaryPresenter = ({ blogTagsData, onClickTag }: Props) => {
  return (
    <SECTION.Frame>
      <SummaryTitle text="TAGS" />
      <DIV.TagsWrapper>
        {blogTagsData?.tags.map((tag, index) => (
          <DIV.TagWrapper key={index} onClick={() => onClickTag(tag.name)} tagCount={tag.count}>
            {tag.name}
          </DIV.TagWrapper>
        ))}
      </DIV.TagsWrapper>
    </SECTION.Frame>
  );
};

export default TagsSummaryPresenter;
