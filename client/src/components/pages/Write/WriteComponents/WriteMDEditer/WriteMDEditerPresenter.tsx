import { BlogPostReq } from '@app/services/blog/blogPostApi';
import React, { ChangeEvent } from 'react';
import { StyledWriteMDEditer } from './WriteMDEditerStyle';

interface Props {
  blogPostInfo: BlogPostReq;
  onChangeTextarea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const WriteMDEditerPresenter = ({ blogPostInfo, onChangeTextarea }: Props) => {
  return (
    <StyledWriteMDEditer>
      <div>toolbar</div>
      <textarea value={blogPostInfo.content} onChange={onChangeTextarea} />
    </StyledWriteMDEditer>
  );
};

export default WriteMDEditerPresenter;
