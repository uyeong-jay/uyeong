import React, { ChangeEvent, useCallback, useState } from 'react';
import { BlogPostReq } from '@app/services/blog/blogPostApi';
import WriteHeaderPresenter from './WriteHeaderPresenter';

interface Props {
  blogPostInfo: BlogPostReq;
  setBlogPostInfo: (blogPostInfo: BlogPostReq) => void;
}

const WriteHeaderContainer = ({ blogPostInfo, setBlogPostInfo }: Props) => {
  const { tags } = blogPostInfo;
  const [currTag, setCurrTag] = useState('');

  //Title 작성 input
  const onChangeTitleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBlogPostInfo({ ...blogPostInfo, title: e.target.value });
    },
    [blogPostInfo, setBlogPostInfo],
  );

  //Tag 작성 input
  const onChangeTagInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrTag(e.target.value);
  }, []);

  //Tag 추가
  const onSubmitTag = useCallback(
    (e) => {
      e.preventDefault();
      //입력하지 않았거나 이미 존재할 경우
      if (!currTag || tags.find((tag) => tag === currTag)) {
        setCurrTag('');
        return;
      }
      //존재하지 않을 경우
      tags.push(currTag);
      setBlogPostInfo({ ...blogPostInfo, tags });
      setCurrTag('');
    },
    [blogPostInfo, currTag, setBlogPostInfo, tags],
  );

  //Tag 삭제
  const onClickTag = useCallback(
    (selectedTag) => {
      const newTags = tags.filter((tag) => tag !== selectedTag);
      setBlogPostInfo({ ...blogPostInfo, tags: newTags });
    },
    [blogPostInfo, setBlogPostInfo, tags],
  );

  return (
    <WriteHeaderPresenter
      blogPostInfo={blogPostInfo}
      currTag={currTag}
      onChangeTitleInput={onChangeTitleInput}
      onChangeTagInput={onChangeTagInput}
      onSubmitTag={onSubmitTag}
      onClickTag={onClickTag}
    />
  );
};

export default WriteHeaderContainer;
