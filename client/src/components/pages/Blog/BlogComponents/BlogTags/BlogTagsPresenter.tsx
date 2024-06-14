import React, { useCallback } from 'react';
import { DIV, ASIDE } from './BlogTagsStyle';
import { TagWithCount } from './BlogTagsContainer';

interface Props {
  allTags: TagWithCount[];
  tagUnderline: string;
  onClickTag: (tagName: string) => void;
  isTagClicked: boolean;
}

const BlogTagsPresenter = ({ allTags, tagUnderline, onClickTag, isTagClicked }: Props) => {
  const tagNameLength = useCallback((tagName: string) => {
    const cutTagName = tagName.slice(0, 13);

    const finalTagName = tagName.length > 13 ? cutTagName + '...' : cutTagName;

    return finalTagName;
  }, []);

  return (
    <ASIDE.BlogTags>
      <h3>Tags</h3>
      <div className="tags-wrapper">
        {allTags.map((tag, index) => (
          <DIV.BlogTag
            key={index}
            onClick={() => onClickTag(tag.name)}
            tagUnderline={tagUnderline}
            tagName={tag.name}
            isTagClicked={isTagClicked}
          >
            <span>{tagNameLength(tag.name)}</span>
            <span>({tag.count})</span>
          </DIV.BlogTag>
        ))}
      </div>
    </ASIDE.BlogTags>
  );
};

export default BlogTagsPresenter;
