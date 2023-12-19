import { BlogPostReq } from '@app/services/blog/postApi';
import React, { ChangeEvent } from 'react';
import { StyledWriteMDEditer } from './WriteMDEditerStyle';
import TextareaBox from '@molecules/textareaBox/textareaBox';

interface Props {
  blogPostInfo: BlogPostReq;
  memoizedContent: string;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const WriteMDEditerPresenter = ({ blogPostInfo, memoizedContent, onChangeTextarea }: Props) => {
  return (
    <StyledWriteMDEditer>
      <TextareaBox
        value={!memoizedContent ? blogPostInfo.content : memoizedContent}
        onChange={onChangeTextarea}
        placeholder="Write your story"
        spellCheck="false"
      />
    </StyledWriteMDEditer>
  );
};

export default WriteMDEditerPresenter;
