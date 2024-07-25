import { BlogPostReq } from '@app/services/blog/postApi';
import React, { ChangeEvent } from 'react';
import { DIV } from './WriteMDEditerStyle';
import TextareaBox from '@molecules/TextareaBox';

interface Props {
  blogPostInfo: BlogPostReq;
  memoizedContent: string;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const WriteMDEditerPresenter = ({ blogPostInfo, memoizedContent, onChangeTextarea }: Props) => {
  return (
    <DIV.WriteMDEditerFrame>
      <TextareaBox
        value={!memoizedContent ? blogPostInfo.content : memoizedContent}
        onChange={onChangeTextarea}
        placeholder="Write your story..."
        spellCheck={false}
      />
    </DIV.WriteMDEditerFrame>
  );
};

export default WriteMDEditerPresenter;
