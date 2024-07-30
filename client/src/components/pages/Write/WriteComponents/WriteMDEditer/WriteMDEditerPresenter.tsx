import React, { ChangeEvent } from 'react';
import { DIV } from './WriteMDEditerStyle';
import TextareaBox from '@molecules/TextareaBox';

interface Props {
  blogPostContent: string;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const WriteMDEditerPresenter = ({ blogPostContent, onChangeTextarea }: Props) => {
  return (
    <DIV.WriteMDEditerFrame>
      <TextareaBox
        value={blogPostContent}
        onChange={onChangeTextarea}
        placeholder="Write your story..."
        spellCheck={false}
      />
    </DIV.WriteMDEditerFrame>
  );
};

export default WriteMDEditerPresenter;
