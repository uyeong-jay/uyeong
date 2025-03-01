import React, { useCallback } from 'react';
import { DIV, ASIDE } from './BlogTagsStyle';
import { BlogTagRes } from '@app/services/blog/tagApi';

interface Props {
  blogTagsData?: BlogTagRes;
  tagUnderline: string;
  onClickTag: (tagName: string) => void;
  isTagClicked: boolean;
}

const BlogTagsPresenter = ({ blogTagsData, tagUnderline, onClickTag, isTagClicked }: Props) => {
  const tagNameLength = useCallback((tagName: string) => {
    const cutTagName = tagName.slice(0, 13);

    const finalTagName = tagName.length > 13 ? cutTagName + '...' : cutTagName;

    return finalTagName;
  }, []);

  return (
    <ASIDE.BlogTags>
      <h3>Tags</h3>
      <div className="tags-wrapper">
        {blogTagsData?.tags.map((tag, index) => (
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
